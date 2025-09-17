import { connectMongoDB } from '~/lib/mongodb'
import Household from '~/models/Household'
import { createPredefinedError, createSuccessResponseWithMessages } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.address || body.houseUsage === undefined) {
      throw createPredefinedError('MISSING_REQUIRED_FIELDS', {
        details: ['firstName', 'lastName', 'address', 'houseUsage']
      })
    }

    // Validate data types and ranges
    if (body.houseUsage < 0 || body.houseUsage > 999999) {
      throw createPredefinedError('VALIDATION_ERROR', {
        details: ['houseUsage must be between 0 and 999999']
      })
    }

    const houseHold = await Household.find()
        .select('_id firstName lastName address houseUsage isActive status createdAt updatedAt')
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
      address: body.address.trim(),
      houseUsage: Number(body.houseUsage),
      isActive: body.isActive !== undefined ? body.isActive : 1,
      status: body.status || 'active'
    }


    // Create and save new household to MongoDB
    const newHousehold = new Household(householdData)
    const savedHousehold = await newHousehold.save()

    return createSuccessResponseWithMessages({
      data: savedHousehold,
      message: 'Household created successfully'
    })

    // return {}
  
  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
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
    console.error('Household creation error:', error)
    throw createPredefinedError('INTERNAL_ERROR')
  }
})