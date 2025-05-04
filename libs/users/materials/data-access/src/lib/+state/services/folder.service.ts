// material.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FolderDTO {
  id: number;
  title: string;
  created_at: number;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder';

  constructor(private http: HttpClient) {}

  loadFolders(): Observable<FolderDTO[]> {
    return this.http.get<FolderDTO[]>(this.apiUrl);
  }

  createFolder(title: string): Observable<FolderDTO> {
    return this.http.post<FolderDTO>(this.apiUrl, { title });
  }
}
