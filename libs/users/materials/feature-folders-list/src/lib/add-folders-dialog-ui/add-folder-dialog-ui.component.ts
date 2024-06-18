import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type AddDialogRef = MatDialogRef<AddFolderDialogUiComponent, string>

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './add-folder-dialog-ui.component.html',
  styleUrls: ['./add-folder-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFolderDialogUiComponent {
  private readonly dialogRef: AddDialogRef = inject(MatDialogRef);

  onDoneButtonClick(title: string) {
    this.dialogRef.close(title);
  }
}
