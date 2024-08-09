import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    initMaterialsSuccess: props<{folders: Folder[]}>(),
    initMaterialsFailure: emptyProps(),
    loadAllFolders: emptyProps(),
    loadFoldersFailure: emptyProps(),
  },
});
