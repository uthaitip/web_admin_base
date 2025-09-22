import type { BaseState } from "#imports";

export interface AddressState extends BaseState {
    list?: Address[];
    address?: Address[];
}

export interface AddressListRequest extends BaseRequestQuery {}

export interface AddressListRequest extends BaseRequestData {
    address?: string;
    houseNumber?: string;
    province?: string;
    subdistrict?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export interface AddressCreateRequest extends Omit<Address, 'id' | 'createdAt' | 'updatedAt'> {}

export interface AddressUpdateRequest extends AddressCreateRequest {
    id: string;
}

export interface AddressDeleteRequest {
    id: string;
}