import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageTimerService {

  getItem(): string | null {
    return localStorage.getItem('time') || null;
  }

  setItem(data: string): string {
    localStorage.setItem('time', data);
    return data;
  }

  removeItem(): boolean {
    localStorage.removeItem('time');
    return true;
  }
}
