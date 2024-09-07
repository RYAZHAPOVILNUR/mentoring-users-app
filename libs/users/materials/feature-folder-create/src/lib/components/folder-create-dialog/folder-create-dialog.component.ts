import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CreateFolderFormService } from '../../services/create-folder-form.service';
import { FormGroup } from '@angular/forms';
import { FormComponent } from 'libs/users/shared/components/form/form.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'users-folder-add-dialog',
  styleUrls: ['./folder-create-dialog.component.scss'],
  templateUrl: './folder-create-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateFolderFormService],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    FormComponent,
  ],
})
export class FolderCreateEditDialogComponent {
  public readonly dialogRef = inject(
    MatDialogRef<FolderCreateEditDialogComponent>
  );
  private readonly createFolderFormService = inject(CreateFolderFormService);
  public readonly translationKeyPrefix = 'MATERIALS.FOLDER-CREATE-DIALOG.';
  public readonly headerTranslationKey = this.translationKeyPrefix + 'HEADER';
  public readonly saveTranslationKey =
    this.translationKeyPrefix + 'ACTIONS.SAVE';
  public readonly cancelTranslationKey =
    this.translationKeyPrefix + 'ACTIONS.CLOSE';
  public formGroup: FormGroup = new FormGroup({});
  public formFields = this.createFolderFormService.getFormFields();
  public readonly formKey = 'folderKey';

  public save() {
    const formValues = this.formGroup.getRawValue();
    this.createFolderFormService.createFolder(formValues[this.formKey]);
    this.dialogRef.close(true);
  }

  public close() {
    this.dialogRef.close(false);
  }
}
