/**
 * Interface for the 'Materials' data
 */

// приходит с бэка
export interface MaterialDTO {
  id: number;
  created_at: number; // new Date().toString()
  title: string;
  material_link: string;
  folder_id: number;
}

// форма представления в store
export interface MaterialEntity {
  id: number;
  created_at: number; // new Date().toString()
  title: string;
  material_link: string;
  folder_id: number;
}

// VM - форма представления в компоненте
export interface MaterialVM {
  id: number;
  created_at: number; // new Date().toString()
  title: string;
  material_link: string;
  folder_id: number;
}

export interface CreateMaterialDTO {
  title: string;
  material_link: string;
  folder_id?: number;
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
