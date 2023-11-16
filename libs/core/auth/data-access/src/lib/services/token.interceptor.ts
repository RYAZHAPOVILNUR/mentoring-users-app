import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { LocalStorageJwtService } from "./local-storage-jwt.service";
import { Router } from "@angular/router";

const shouldIntercept = (req: HttpRequest<any>): boolean  => {
    const excludedUrls: string[] = [
      'suggestions.dadata.ru',
    ];

    for (const url of excludedUrls) {
      if (req.url.includes(url)) {
        return false;
      }
    }

    return true;
  }

export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const localStorageJwtService = inject(LocalStorageJwtService)
  const token: string | null = localStorageJwtService.getItem()
  const router = inject(Router);

  if (token && shouldIntercept(request)) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
        localStorageJwtService.removeItem()
      }
      return throwError(() => error);
    })
  );
};
