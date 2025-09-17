import { HouseHold } from './../../../composables/data_models/user-management';
import { connectMongoDB } from '~/lib/mongodb'
import Household from '~/models/Household'
import { createPredefinedError, createSuccessResponseWithMessages } from '~/server/utils/responseHandler'
import { createHouseholdFilterConfig } from '~/server/utils/filter_config/houseHoldManagement'
import { parseQueryAndBuildFilter } from '~/server/utils/queryParser'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const query = getQuery(event)

    let parsedQuery, mongoFilter;
    
    if (query.pagination && typeof query.pagination === 'object') {
      const pagination = query.pagination as any;
      const filter = query.filter as any;
      
      parsedQuery = {
        pagination: {
          page: parseInt(pagination.page) || 1,
          limit: parseInt(pagination.limit) || 10
        },
        filter: filter || {},
        search: (query.search as string) || ''
      };
      
      mongoFilter = {} as any;
      
      // Handle search
      if (parsedQuery.search) {
        mongoFilter.$or = [
          { firstName: { $regex: parsedQuery.search, $options: 'i' } },
          { lastName: { $regex: parsedQuery.search, $options: 'i' } },
          { address: { $regex: parsedQuery.search, $options: 'i' } }
        ];
      }
      
      // Handle filters
      if (parsedQuery.filter.status) {
        mongoFilter.status = parsedQuery.filter.status;
      }
      
    } else {
      // Handle flat bracket notation (fallback)
      const result = parseQueryAndBuildFilter(
        query, 
        createHouseholdFilterConfig(),
        ['firstName', 'lastName', 'address' , 'houseCode']
      );
      parsedQuery = result.parsedQuery;
      mongoFilter = result.mongoFilter;
    }
    
    const { page, limit } = parsedQuery.pagination
    let filter = mongoFilter;
    
    console.log('API: parsedQuery', parsedQuery)
    console.log('API: mongoFilter =>', filter);
    
    if (parsedQuery.search) {
      console.log('API: Search term:', parsedQuery.search);
    }

    const total = await Household.countDocuments(filter)

    const houseHold = await Household.find(filter)
    .select('_id houseCode firstName lastName address houseUsage isActive status createdAt updatedAt')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

    return createSuccessResponseWithMessages({
      data: houseHold,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    throw createPredefinedError('INTERNAL_ERROR')
  }
});
