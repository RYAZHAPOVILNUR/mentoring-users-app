import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFolder, IFolderId, IFolderCreate } from '../../models/ifolder';
import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private httpClient: HttpClient) {}

  private apiService = inject(ApiService);
  private url = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';

  public getFolders(): Observable<IFolder[]> {
    return this.apiService.get<IFolder[]>('/folder');
  }

  public getFolder(id: number): Observable<IFolder> {
    return this.apiService.get<IFolder>(`/${id}`);
  }

  public postFolder(title: IFolderCreate): Observable<IFolderCreate> {
    return this.httpClient.post<IFolderCreate>(this.url, title);
  }

  public deleteFolder(folder_id: number): Observable<IFolderId> {
    return this.httpClient.delete<IFolderId>(`${this.url}/${folder_id}`);
  }

  public updateFolder(folder: IFolder) {
    return this.httpClient.put<IFolder>(`${this.url}/${folder.id}`, folder);
  }
}
