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
  VMtoEntity(VM: UsersVM): UsersEntity {
    return {
      id: VM.id,
      name: VM.name,
      username: VM.username,
      email: VM.email,
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
