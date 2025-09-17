import type { BaseState } from './base'

export interface HouseHoldState extends BaseState { 
  household?: HouseHold[]
}

export interface HouseHoldListRequest extends BaseRequestQuery {}

export interface HouseHoldCreateRequest extends Omit<HouseHold, 'id' | 'createdAt' | 'updatedAt'> {}

export interface HouseHoldUpdateRequest extends Partial<HouseHoldCreateRequest> {
  id: string
}

export interface HouseHoldDeleteRequest {
  id: string
}

export interface HouseHoldRolesUpdateRequest {
//   id: string
//   roleIds: string[]
}