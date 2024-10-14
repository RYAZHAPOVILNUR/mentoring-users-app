import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { LoadingStatus } from "@users/core/data-access";
import { foldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersEntity> {
    status: LoadingStatus;
    error: Error | null;
}

export interface FoldersEntity {
    id: number;
    created_at: string;
    title: string;
};

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialUsersState: FoldersState = foldersAdapter.getInitialState({
    status: 'init',
    error: null,
});

const reducer = createReducer(
    initialUsersState,
    on(foldersActions.initFolders, (state) => ({
        ...state,
        status: 'loading' as const,
    })),
    on(foldersActions.initFoldersSuccess, (state, { folders }) =>
        foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(foldersActions.initFoldersFailure, (state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),
    on(foldersActions.addFolderSuccess, (state, { folder }) => foldersAdapter.addOne({ ...folder }, { ...state })),
    on(foldersActions.addFolderFailed, (state, { error }) => {
        return {
            ...state,
            status: 'error' as const,
            error,
        };
    }),
    on(foldersActions.deleteFolder, (state) => {
        return {
            ...state,
            status: 'loading' as const,
        };
    }),
    on(foldersActions.deleteFolderSuccess, (state, { folderId }) => foldersAdapter.removeOne(folderId, { ...state })),
    on(foldersActions.deleteFolderFailed, (state, { error }) => {
        return {
            ...state,
            status: 'error' as const,
            error,
        };
    })
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
    return reducer(state, action);
}