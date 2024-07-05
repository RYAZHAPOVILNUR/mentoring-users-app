import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { InputFieldComponent } from '@core/text-field';

type AddDialogRef = MatDialogRef<AddFolderDialogUiComponent, string>

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    FormsModule,
    InputFieldComponent,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-folder-dialog-ui.component.html',
  styleUrls: ['./add-folder-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFolderDialogUiComponent {
  private readonly dialogRef: AddDialogRef = inject(MatDialogRef);

  onDoneButtonClick(): void {
    this.dialogRef.close(this.folderNameControl.value);
  }

  folderNameControl = new FormControl('', {
    validators: Validators.required,
    nonNullable: true
  });
}
