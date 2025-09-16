import { MaterialVM } from '@users/data-access-material';

export type CreateMaterialCloseData = Pick<MaterialVM, 'title' | 'materialLink'>;
