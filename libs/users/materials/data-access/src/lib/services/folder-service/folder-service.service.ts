import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFolder } from '../../models/ifolder';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private httpClient: HttpClient) {}
  private url = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';

  public getFolders(): Observable<IFolder[]> {
    return this.httpClient.get<IFolder[]>(this.url);
  }
}
