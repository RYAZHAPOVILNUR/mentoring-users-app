import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CreateMaterialWithoutFolderId, Folder, Material } from '../data-access';

@Injectable({ providedIn: 'root' })
export class MaterialStateService {
  private readonly _addFolder$$ = new Subject<string>();
  private readonly _deleteFolder$$ = new Subject<Omit<Folder, 'created_at'>>();
  private readonly _openFolder$$ = new Subject<number>();
  private readonly _addMaterial$$ = new Subject<CreateMaterialWithoutFolderId>();
  private readonly _deleteMaterial$$ = new Subject<Pick<Material, 'id' | 'title'>>();
  private readonly _openMaterial$$ = new Subject<Omit<Material, 'folder_id'>>();

  public get addFolder$(): Observable<string> {
    return this._addFolder$$.asObservable();
  }

  public updateAddFolder(title: string) {
    this._addFolder$$.next(title);
  }

  public get deleteFolder$(): Observable<Omit<Folder, 'created_at'>> {
    return this._deleteFolder$$.asObservable();
  }

  public updateDeleteFolder(data: Omit<Folder, 'created_at'>) {
    this._deleteFolder$$.next(data);
  }

  public get openFolder$(): Observable<number> {
    return this._openFolder$$.asObservable();
  }

  public updateOpenFolder(data: number) {
    this._openFolder$$.next(data);
  }

  public get addMaterial$(): Observable<CreateMaterialWithoutFolderId> {
    return this._addMaterial$$.asObservable();
  }

  public updateAddMaterial(material: CreateMaterialWithoutFolderId) {
    this._addMaterial$$.next(material);
  }

  public get deleteMaterial$(): Observable<Pick<Material, 'id' | 'title'>> {
    return this._deleteMaterial$$.asObservable();
  }

  public updateDeleteMaterial(data: Pick<Material, 'id' | 'title'>) {
    this._deleteMaterial$$.next(data);
  }

  public get openMaterial$(): Observable<Omit<Material, 'folder_id'>> {
    return this._openMaterial$$.asObservable();
  }

  public updateOpenMaterial(material: Omit<Material, 'folder_id'>) {
    this._openMaterial$$.next(material);
  }
}
