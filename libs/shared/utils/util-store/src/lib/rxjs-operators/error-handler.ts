import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, OperatorFunction, retry, throwError } from 'rxjs';

import { NotificationService } from '@shared/util-notification';

import { ErrorMsg } from '../configs/error.enum';

export function withErrorHandler<T>(error?: string): OperatorFunction<T, T> {
  const notificationService = inject(NotificationService);
  const translateService = inject(TranslateService);
  return (source: Observable<T>) =>
    source.pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMessage = translateService.instant(error ?? ErrorMsg.API_ERROR);
        notificationService.show(errorMessage);
        return throwError(() => err);
      }),
      retry({
        count: 3,
        delay: 1000,
      }),
    );
}
