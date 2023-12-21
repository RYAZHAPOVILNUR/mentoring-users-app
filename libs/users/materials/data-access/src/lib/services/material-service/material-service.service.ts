import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaterial, IMaterialId, IMaterialPost } from '../../models/imaterial';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private httpClient: HttpClient) {}
  private url = 'https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/material';

  public getMaterials(): Observable<IMaterial[]> {
    return this.httpClient.get<IMaterial[]>(this.url);
  }

  public postMaterial(post: IMaterialPost): Observable<IMaterialPost> {
    return this.httpClient.post<IMaterialPost>(this.url, post);
  }

  public deleteMaterial(material_id: number): Observable<IMaterialId> {
    return this.httpClient.delete<IMaterialId>(`${this.url}/${material_id}`);
  }
}
