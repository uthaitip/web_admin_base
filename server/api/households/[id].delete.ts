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
        console.log('id', id);
    } catch (error) {
        
    }
})