import { MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

export type ConfirmDialog = MatDialogRef<ConfirmDialogComponent, true>;
