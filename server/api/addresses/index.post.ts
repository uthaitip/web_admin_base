import { connectMongoDB } from '~/server/utils/mongodb'
import Address from '~/server/models/Address'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'
import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  // Check authentication
  const authHeader = getHeader(event, 'authorization')
  const token = extractTokenFromHeader(authHeader)

  if (!token) {
    throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
  }

  try {
    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)

    if (!user || !user.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
    }

    const body = await readBody(event)
    console.log('Address body:', body)
    
    // Map and validate required fields
    const addressData: any = {
      
      houseNumber: body.houseNumber,
      province: body.province,
      subdistrict: body.subDistrict || body.subdistrict, // Handle both cases
      district: body.district,
      zipCode: body.zipCode ,
      houseHoldId: body?.houseHoldId,
    }
    
    // Validate required fields
    const requiredFields = ['houseNumber', 'province', 'subdistrict', 'district', 'zipCode']
    const missingFields = requiredFields.filter(field => !addressData[field])
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields)
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS)
    }
    
    const address = new Address(addressData)
    await address.save()
    return createSuccessResponse(address)

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle JWT errors
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED)
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      console.error('Address validation error:', error.errors)
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR)
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS)
    }

    console.error('Address creation error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})