import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageJwtService {

  getItem(): string | null {
    return localStorage.getItem('jwtToken') || null;
  }

  setItem(data: string): string {
    localStorage.setItem('jwtToken', data);
    return data;
  }

  removeItem(): boolean {
    localStorage.removeItem('jwtToken');
    return true;
  }
}
