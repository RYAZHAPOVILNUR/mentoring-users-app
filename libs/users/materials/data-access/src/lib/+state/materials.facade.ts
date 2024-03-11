import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllFolders, selectLoadingStatus } from './materials.selectors';
import { Observable } from 'rxjs';
import { Folder } from '../models/folder.model';

@Injectable()
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectAllFolders);
  public readonly loadingStatus$ = this.store.select(selectLoadingStatus);
}
