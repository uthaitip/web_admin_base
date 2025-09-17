import { HouseHold } from './../../../composables/data_models/user-management';
import { connectMongoDB } from '~/lib/mongodb'
import Household from '~/models/Household'
import { createPredefinedError, createSuccessResponseWithMessages } from '~/server/utils/responseHandler'
import { createHouseholdFilterConfig } from '~/server/utils/filter_config/houseHoldManagement'
import { parseQueryAndBuildFilter } from '~/server/utils/queryParser'

export default defineEventHandler(async (event) => {
    try {
        await connectMongoDB()

        const id = getRouterParam(event, 'id')
        const role = await Household.findById(id)
        if (!role) {
            throw createPredefinedError('NOT_FOUND')
        }

        const usersWithRole = await Household.countDocuments({ roles: id })
        if (usersWithRole > 0) {
            throw createPredefinedError('INVALID_INPUT', {
                details: 'not found'
            })
        }

        await Household.findByIdAndDelete(id)
        return createSuccessResponseWithMessages({})
    } catch (error) {

    }
})