import { DeepReadonly } from '../../../core/utils/src';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";

export type MaterialsVM = DeepReadonly<
  Pick<MaterialsType, 'id' | 'created_at' | 'title' | 'material_link' | 'folder_id'>
>;