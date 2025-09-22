import { connectMongoDB } from '~/server/utils/mongodb'
import Household from '~/server/models/Household'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const body = await readBody(event)
    console.log('body', body);
    
    // Validate required fields
    // if (!body.firstName || !body.lastName || body.houseUsage === undefined) {
    //   throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS)
    // }

    // Validate data types and ranges
    // if (body.houseUsage < 0 || body.houseUsage > 999999) {
    //   throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR)
    // }

    const houseHold = await Household.find()
        .select('_id firstName lastName houseUsage isActive status createdAt updatedAt')
        .sort({ createdAt: -1 });
    
    let houseCode = ""

    if(houseHold.length > 0) {
      houseCode = "HH" + (houseHold.length + 1);
    }else {
      houseCode = "HH1"
    }
        

    // Create household data
    const householdData = {
      houseCode: houseCode,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      houseUsage: Number(body.houseUsage),
      isActive: body.isActive !== undefined ? body.isActive : 1,
      status: body.status || 'active'
    }


    // Create and save new household to MongoDB
    const newHousehold = new Household(householdData)
    const savedHousehold = await newHousehold.save()

    return createSuccessResponse(savedHousehold)

    // return {}
  
  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR)
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS)
    }

    // Log unexpected errors
    console.error('Household creation error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})