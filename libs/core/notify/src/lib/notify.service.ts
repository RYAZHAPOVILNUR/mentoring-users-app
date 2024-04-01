import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private readonly snackBar = inject(MatSnackBar);

  public open(message: string, action?: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}
