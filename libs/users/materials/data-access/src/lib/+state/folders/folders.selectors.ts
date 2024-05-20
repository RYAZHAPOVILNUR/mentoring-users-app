import { createFeatureSelector } from '@ngrx/store';
import * as fromFolders from './folders.reducer';

export const selectFoldersState = createFeatureSelector<fromFolders.State>(fromFolders.foldersFeatureKey);

