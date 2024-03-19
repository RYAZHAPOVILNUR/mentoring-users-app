import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CreateMaterialWithoutFolderId, Folder, Material } from '../data-access';

@Injectable({ providedIn: 'root' })
export class MaterialStateService {
  private readonly addFolder$$ = new Subject<string>();
  private readonly deleteFolder$$ = new Subject<Omit<Folder, 'created_at'>>();
  private readonly openFolder$$ = new Subject<number>();
  private readonly addMaterial$$ = new Subject<CreateMaterialWithoutFolderId>();
  private readonly deleteMaterial$$ = new Subject<Pick<Material, 'id' | 'title'>>();

  public get addFolder$(): Observable<string> {
    return this.addFolder$$.asObservable();
  }

  public updateAddFolder(title: string) {
    this.addFolder$$.next(title);
  }

  public get deleteFolder$(): Observable<Omit<Folder, 'created_at'>> {
    return this.deleteFolder$$.asObservable();
  }

  public updateDeleteFolder(data: Omit<Folder, 'created_at'>) {
    this.deleteFolder$$.next(data);
  }

  public get openFolder$(): Observable<number> {
    return this.openFolder$$.asObservable();
  }

  public updateOpenFolder(data: number) {
    this.openFolder$$.next(data);
  }

  public get addMaterial$(): Observable<CreateMaterialWithoutFolderId> {
    return this.addMaterial$$.asObservable();
  }

  public updateAddMaterial(material: CreateMaterialWithoutFolderId) {
    this.addMaterial$$.next(material);
  }

  public get deleteMaterial$(): Observable<Pick<Material, 'id' | 'title'>> {
    return this.deleteMaterial$$.asObservable();
  }

  public updateDeleteMaterial(data: Pick<Material, 'id' | 'title'>) {
    this.deleteMaterial$$.next(data);
  }
}
