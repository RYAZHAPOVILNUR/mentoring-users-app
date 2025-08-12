import { EmbeddedViewRef, inject, Injectable, TemplateRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

type ConfigType = {
  duration: number;
  horizontalPosition: MatSnackBarHorizontalPosition | null;
  verticalPosition: MatSnackBarVerticalPosition | null;
};

const defaultConfig: MatSnackBarConfig<ConfigType> = {
  duration: 2500,
  horizontalPosition: 'center',
  verticalPosition: 'top',
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  show(message: string, action = 'Закрыть'): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, defaultConfig);
  }

  openFromTemplate(template: TemplateRef<unknown>): MatSnackBarRef<EmbeddedViewRef<unknown>> {
    return this.snackBar.openFromTemplate(template, defaultConfig);
  }
}
