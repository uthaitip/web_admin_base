import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, errorState } from '~/composables/store_models/base'
import type {
    AddressState,
    AddressListRequest,
    AddressCreateRequest,
    AddressUpdateRequest,
    AddressDeleteRequest
} from '~/composables/store_models/address'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useAddressStore = defineStore('address', {
    state: () => ({
        ...initState,
        ...loadingState,
        ...errorState,
        list: [] as AddressState[],
        address: [] as AddressState[]
    }),

    getters: {
      getAddressList: (state) => state.list,
      getAddressById: (state) => (id: string) => state.list?.find((address: any) => address.id === id)  
    },
    
    actions: {
        async createAddress(requestData: BaseRequestData<AddressCreateRequest>){
            console.log('requestData', requestData);
            try {
                this.$patch(loadingState(requestData));
                const httpClient = useHttpClient();
                const response = await httpClient.post(API_ENDPOINTS.ADDRESSES.CREATE, requestData.body);
                this.address = response?.data;
                this.isSuccess = true;
                this.isError = false;
                this.isLoading = false;
                return response;
            } catch (error: any) {
                this.$patch(errorState({ ...(error || {}) }))
                throw new BaseResponseError(error?.data || error);
            }
        }
    }
})