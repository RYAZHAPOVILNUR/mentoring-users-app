import { CreateUserDTO } from "@users/core/data-access";

export type Cb = () => void

export interface EditUserPayload {
  userData: CreateUserDTO;
  onSuccessCb: Cb;
}

export interface EditUserPayloadWithId {
  userData: CreateUserDTO;
  id: number;
  onSuccessCb: Cb;
}
