import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageJwtService } from './local-storage-jwt.service';

export const authGuard = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageJwtService);

  if (!storage.getItem()) {
    router.navigate(['/guest/home']);
    return false;
  }
  return true;
};
