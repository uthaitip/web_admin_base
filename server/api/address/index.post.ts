import { connectMongoDB } from '~/server/utils/mongodb'
import Address from '~/server/models/Address'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const body = await readBody(event)
    console.log('body post', body);
    
    // Map and validate required fields
    const addressData: any = {
      houseNumber: body.houseNumber,
      province: body.province,
      subdistrict: body.subDistrict || body.subdistrict, // Handle both cases
      district: body.district,
      zipCode: body.zipCode
    }
    
    // Validate required fields
    const requiredFields = ['houseNumber', 'province', 'subdistrict', 'district', 'zipCode']
    const missingFields = requiredFields.filter(field => !addressData[field])
    
    if (missingFields.length > 0) {
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