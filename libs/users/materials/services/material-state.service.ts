import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Folder, Material } from '../data-access';
import { CreateMaterialWithoutFolderId } from '../data-access/src/lib/models/create-material.model';

@Injectable({ providedIn: 'root' })
export class MaterialStateService {
  private readonly addFolder$$ = new Subject<string>();
  private readonly deleteFolder$$ = new Subject<Omit<Folder, 'created_at'>>();
  private readonly openFolder$$ = new Subject<number>();
  private readonly addMaterial$$ = new Subject<CreateMaterialWithoutFolderId>();
  private readonly deleteMaterial$$ = new Subject<Pick<Material, 'id' | 'title'>>();

  public get addFolder$() {
    return this.addFolder$$.asObservable();
  }

  public updateAddFolder(title: string) {
    this.addFolder$$.next(title);
  }

  public get deleteFolder$() {
    return this.deleteFolder$$.asObservable();
  }

  public updateDeleteFolder(data: Omit<Folder, 'created_at'>) {
    this.deleteFolder$$.next(data);
  }

  public get openFolder$() {
    return this.openFolder$$.asObservable();
  }

  public updateOpenFolder(data: number) {
    this.openFolder$$.next(data);
  }

  public get addMaterial$() {
    return this.addMaterial$$.asObservable();
  }

  public updateAddMaterial(material: CreateMaterialWithoutFolderId) {
    this.addMaterial$$.next(material);
  }

  public get deleteMaterial$() {
    return this.deleteMaterial$$.asObservable();
  }

  public updateDeleteMaterial(data: Pick<Material, 'id' | 'title'>) {
    this.deleteMaterial$$.next(data);
  }
}
