import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageJwtService } from "./local-storage-jwt.service";
import { map, take } from "rxjs";


export const authGuard = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageJwtService);

  return storage.getItem().pipe(
    map((token) => {
      if (!token) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    take(1),
  );
};
