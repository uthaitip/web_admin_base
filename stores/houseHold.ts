import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, errorState } from '~/composables/store_models/base'
import type {
  HouseHoldState,
  HouseHoldListRequest,
  HouseHoldCreateRequest,
  HouseHoldUpdateRequest,
  HouseHoldDeleteRequest,
  HouseHoldRolesUpdateRequest
} from '~/composables/store_models/house_hold'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useHouseholdStore = defineStore('households', {

  state: (): HouseHoldState => ({
    ...initState,
    household: []
  }),

  getters: {
    getHouseHoldById: (state) => (id: string) => state.list?.find((household: any) => household.id === id),
    totalHouseHolds: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async getHouseHoldList(requestData: BaseRequestData<HouseHoldListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData));

        const httpClient = useHttpClient();
        console.log('Store: requestData.query', requestData)

        const response = await httpClient.get(API_ENDPOINTS.HOUSEHOLDS.LIST, requestData.query);

        console.log('Store: API response', response);

        this.list = [...(response?.data || [])];
        this.pagination = { ...(response?.pagination || {}) };
        this.isLoading = false;
        this.isSuccess = true;
        this.isError = false;

        return response;
      } catch (error: any) {
        console.error('Store: API error', error);
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error);
      }
    },

    async deleteUser(requestData: BaseRequestData<HouseHoldListRequest>) {
      try {
        this.$patch(loadingState(requestData))

        console.log( 'equestData.body!.id', requestData.body!.id );

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.HOUSEHOLDS.DELETE(requestData.body!.id)
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },
  }

});