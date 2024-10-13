import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFolder } from '../../models/folder.interface';
import { LoadingStatus } from '../../models/loading-status.enum';
import { FoldersActions } from './folders.actions';
// import { FolderState } from '@users/materials/data-access';

// export const foldersFeatureKey = 'folders';

// export const FOLDERS_FEATURE_KEY = 'folders';
export interface FoldersState extends EntityState<IFolder> {
  folders: IFolder[];
  status: LoadingStatus;
  error: Error | null;
}
export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  folders: [],
  status: LoadingStatus.Init,
  error: null
});

export const foldersFeature = createFeature({
  name: 'folders',
  reducer: createReducer(

// const reducer = createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
        ...state,
        status: LoadingStatus.Loading
      }
    )),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({
        ...state,
        folders: folders
    })),
    on(FoldersActions.loadFoldersFailure, (state, action) => ({
        ...state,
        status: LoadingStatus.Error,
        error: action.error
      }
    ))
  )
});


// export function foldersReducer(state: FoldersState | undefined, action: Action) {
//   return reducer(state, action);
// }
