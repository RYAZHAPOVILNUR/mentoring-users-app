import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  showSnackbar(message: string, action = 'Закрыть', duration = 3000, panelClass = 'default-snackbar'): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass,
    });
  }
}
