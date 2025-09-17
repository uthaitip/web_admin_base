import { commonFieldHandlers, type FilterConfig } from '../queryParser'

/**
 * Create filter config for Household model
 */
export const createHouseholdFilterConfig = (): FilterConfig => ({
  isActive: commonFieldHandlers.number('isActive'),
  status: commonFieldHandlers.stringOrArray('status'),
  firstName: commonFieldHandlers.string('firstName'),
  lastName: commonFieldHandlers.string('lastName'),
  address: commonFieldHandlers.string('address'),
  houseUsage: commonFieldHandlers.number('houseUsage')
})