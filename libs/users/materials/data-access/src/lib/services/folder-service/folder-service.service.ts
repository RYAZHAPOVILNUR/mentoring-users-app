import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFolder, IFolderId, IFolderCreate } from '../../models/ifolder';
import { ApiService } from '@users/core/http';
import { inject } from '@angular/core';
import { API_URL } from '@users/core/http';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private httpClient: HttpClient) {}
  //new service
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  //old service
  private apiService = inject(ApiService);
  private url = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';
  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }

  public getFolders(): Observable<IFolder[]> {
    return this.apiService.get<IFolder[]>('/folder');
  }

  public getFolder(id: number): Observable<IFolder> {
    return this.apiService.get<IFolder>(`/${id}`);
  }

  public postFolder(title: IFolderCreate): Observable<IFolderCreate> {
    return this.httpClient.post<IFolderCreate>(this.url, title);
  }

  public createFolder<T, D>(url: string, data?: D): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  public deleteFolder(folder_id: number): Observable<IFolderId> {
    return this.http.delete<IFolderId>(`${this.apiUrl}/folder/${folder_id}`);
  }

  public updateFolder(folder: IFolder) {
    return this.httpClient.put<IFolder>(`${this.url}/${folder.id}`, folder);
  }
}
