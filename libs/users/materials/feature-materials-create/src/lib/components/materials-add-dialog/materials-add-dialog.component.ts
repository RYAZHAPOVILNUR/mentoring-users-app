import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { FormComponent } from 'libs/users/shared/components/form/form.component';
import { AddMaterialFormService } from '../../services/add-materials-form.service';
import { AddMaterialDialogData } from '../../services/add-material-dialog.service';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialValidationService } from '../../services/material-validation.service';

@Component({
  standalone: true,
  selector: 'users-material-add-dialog',
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddMaterialFormService, MaterialValidationService],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    FormComponent,
    LetDirective,
    AsyncPipe,
    CommonModule,
  ],
})
export class MaterialAddDialogComponent {
  private readonly dialogData: AddMaterialDialogData = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);
  private readonly addMaterialFormService = inject(AddMaterialFormService);
  public readonly formGroup: FormGroup = new FormGroup({});

  public readonly formFields = this.addMaterialFormService.getFormFields(
    this.dialogData.type
  );
  public readonly key = 'materialFields';
  private readonly translationKeyPrefix =
    'MATERIALS.MATERIAL.MATERIAL-CREATE-DIALOG.';
  public readonly headerTranslationKey = this.translationKeyPrefix + 'HEADER';
  public readonly saveTranslationKey =
    this.translationKeyPrefix + 'ACTIONS.SAVE';
  public readonly cancelTranslationKey =
    this.translationKeyPrefix + 'ACTIONS.CLOSE';

  public save() {
    const formValue = this.formGroup.getRawValue();
    this.addMaterialFormService.createMaterial({
      ...formValue[this.key],
      folderId: this.dialogData.parentFolderId,
    });
    this.dialogRef.close(true);
  }

  public close() {
    this.dialogRef.close(false);
  }
}
