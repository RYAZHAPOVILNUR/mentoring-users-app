/**
 * Interface for the 'Folders' data
 */

// приходит с бэка
export interface FolderDTO {
  id: number;
  created_at: number; // new Date().toString()
  title: string;
}

// форма представления в store
export interface FolderEntity {
  id: number;
  created_at: number;
  title: string;
}

// VM - форма представления в компоненте
export interface FolderVM {
  id: number;
  created_at: number;
  title: string;
}


export interface CreateFolderDTO {
  title: string;
}

// export type UsersListVM = DeepReadonly<{
//   users: UsersVM[];
//   status: LoadingStatus;
//   errors: UsersErrors | null;
//   loggedUser: UsersEntity;
// }>;

// export type UsersEntity = Omit<UsersDTO, 'role'> & {
//   isAdmin: boolean | null;
// };
