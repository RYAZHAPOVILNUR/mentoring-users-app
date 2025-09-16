import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService, StorageKey } from '@shared/util-storage';

export const authGuard = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.get<string>(StorageKey.JWT_TOKEN);

  if (!token) {
    router.navigate(['/guest/home']);
    return false;
  }

  return true;
};
