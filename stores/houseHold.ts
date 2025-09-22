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
        const response = await httpClient.get(API_ENDPOINTS.HOUSEHOLDS.LIST, requestData.query);

        this.list = [...(response?.data || [])];
        this.pagination = { ...(response?.pagination || {}) };
        this.isLoading = false;
        this.isSuccess = true;
        this.isError = false;

        return response;
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error);
      }
    },

    async deleteHousehold(requestData: BaseRequestData<HouseHoldListRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.HOUSEHOLDS.DELETE(requestData!.id)
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

    async updateHousehold(requestData: BaseRequestData<HouseHoldListRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.HOUSEHOLDS.UPDATE(requestData.body!.id),
          requestData.body
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

    async createHousehold(requestData: BaseRequestData<HouseHoldCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))
        console.log('requestData', requestData);

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.HOUSEHOLDS.CREATE,
          requestData.body
        )

        console.log('response ===> ', response);

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    }
  }

});