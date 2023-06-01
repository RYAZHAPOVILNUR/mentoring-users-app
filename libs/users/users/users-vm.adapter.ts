import { UsersEntity } from "@users/users/data-access"
import { UsersVM } from "./users-vm"

type UsersVMAdapter = {
  entityToVM(entity: UsersEntity): UsersVM;
  VMtoEntity(VM: UsersVM): UsersEntity
}

export const usersVMAdapter: UsersVMAdapter = {
  entityToVM({ id, name, username, email }) {
    return {id, name, username, email}
  },
  VMtoEntity({id, name, username, email}: UsersVM): UsersEntity {
    return {
      id, name, username, email,
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
  }
  }
}
