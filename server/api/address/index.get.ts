import { connectMongoDB } from '~/server/utils/mongodb'
import Address from '~/server/models/Address'
import { createSuccessResponse, API_RESPONSE_CODES, createPredefinedError } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const addresses = await Address.find()
      .sort({ createdAt: -1 })
      .lean()

    return createSuccessResponse(addresses)
  } catch (error: any) {
    console.error('Get addresses error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})