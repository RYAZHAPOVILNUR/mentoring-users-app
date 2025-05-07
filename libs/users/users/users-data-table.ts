
import { DeepReadonly } from '../../core/utils/src';
import { UsersEntity } from '../../core/data-access/src';

type BaseUsersDataTable = DeepReadonly<Pick<UsersEntity, 'name' | 'email' | 'username' | 'educationTime' |
  'purchaseDate' | 'educationStatus' | 'totalStoryPoints'>>;

export type UsersDataTable = Omit<BaseUsersDataTable, 'purchaseDate'> & {
  purchaseDate: string | Date | null;
}

export type UserFilterParams = {
  purchaseDate?: {
    start: string | null;
    end: string | null;
  };
  educationTime?: {
    min: number | null;
    max: number | null;
  };
  totalStoryPoints?: {
    min: number | null;
    max: number | null;
  };
}
