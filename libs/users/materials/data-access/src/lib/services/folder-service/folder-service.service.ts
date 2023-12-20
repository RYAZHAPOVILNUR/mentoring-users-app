import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFolder, IFolderId, IFolderTitle } from '../../models/ifolder';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private httpClient: HttpClient) {}
  private url = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';

  public getFolders(): Observable<IFolder[]> {
    return this.httpClient.get<IFolder[]>(this.url);
  }

  public getFolder(id: number): Observable<IFolder> {
    return this.httpClient.get<IFolder>(`${this.url}` + `/${id}`);
  }

  public postFolder(title: IFolderTitle): Observable<IFolderTitle> {
    return this.httpClient.post<IFolderTitle>(this.url, title);
  }

  public deleteFolder(folder_id: number): Observable<IFolderId> {
    return this.httpClient.delete<IFolderId>(`${this.url}/${folder_id}`);
  }

  public updateFolder(folder: IFolder) {
    return this.httpClient.put<IFolder>(`${this.url}/${folder.id}`, folder);
  }
}
