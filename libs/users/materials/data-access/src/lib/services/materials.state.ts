import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MaterialEntity } from '../interfaces/material-entity.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialsState {
  private readonly folderDelete$$ = new Subject<number>();
  private readonly folderOpen$$ = new Subject<number>();
  private readonly materialDelete$$ = new Subject<number>();
  private readonly materialOpen$$ = new Subject<MaterialEntity>();
  private readonly materialCreateDialogOpen$$ = new Subject<void>();
  private readonly folderCreateDialogOpen$$ = new Subject<void>();

  readonly folderDelete$ = this.folderDelete$$.asObservable();
  readonly folderOpen$ = this.folderOpen$$.asObservable();
  readonly materialDelete$ = this.materialDelete$$.asObservable();
  readonly materialOpen$ = this.materialOpen$$.asObservable();
  readonly materialCreateDialogOpen$ = this.materialCreateDialogOpen$$.asObservable();
  readonly folderCreateDialogOpen$ = this.folderCreateDialogOpen$$.asObservable();

  deleteFolder(id: number): void {
    this.folderDelete$$.next(id);
  }

  openFolder(id: number): void {
    this.folderOpen$$.next(id);
  }

  openMaterial(material: MaterialEntity): void {
    this.materialOpen$$.next(material);
  }

  deleteMaterial(id: number): void {
    this.materialDelete$$.next(id);
  }

  openCreateMaterialDialog(): void {
    this.materialCreateDialogOpen$$.next();
  }

  openCreateFolderDialog(): void {
    this.folderCreateDialogOpen$$.next();
  }
}