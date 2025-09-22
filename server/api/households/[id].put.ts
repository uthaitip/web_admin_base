import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'
import { connectMongoDB } from '~/server/utils/mongodb'
import User from '~/server/models/User'
import Household from '~/server/models/Household'
import { createPredefinedError, createSuccessResponse, VALIDATION_DETAILS } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()
  
  try {
    
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)
    
    if (!token) {
      throw createPredefinedError('UNAUTHORIZED')
    }

    
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const updatedRole = await Household.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
    
    return createSuccessResponse(updatedRole)
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    // Handle JWT errors
    if (error.message === 'Invalid or expired token') {
      throw createPredefinedError('TOKEN_EXPIRED')
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const fieldErrors = Object.keys(error.errors)
      throw createPredefinedError('VALIDATION_ERROR', {
        details: fieldErrors
      })
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      throw createPredefinedError('ALREADY_EXISTS')
    }
    
    // Log unexpected errors
    throw createPredefinedError('INTERNAL_ERROR')
  }
})