import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FolderCreateEditDataFormService } from '../../services/folder-create-edit-data-form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';

@Component({
  standalone: true,
  selector: 'users-folder-add-dialog',
  styleUrls: ['./folder-create-edit-dialog.component.scss'],
  templateUrl: './folder-create-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderCreateEditDataFormService],
})
export class FolderCreateEditDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<FolderCreateEditDialogComponent>
  );
  private readonly folderCreateEditDataFormService = inject(
    FolderCreateEditDataFormService
  );
  private readonly matDialogData = inject(MAT_DIALOG_DATA);
  public formGroup = inject(FormGroup);
  public readonly formFields =
    this.folderCreateEditDataFormService.getMainFields(this.matDialogData);

  public ngOnInit(): void {
    this.formGroup = this.buildForm();
  }

  public save() {
    const formValues = this.formGroup.getRawValue();
    this.folderCreateEditDataFormService.createFolder(formValues);
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  private buildForm(): FormGroup {
    const formConfig: { [key in keyof Folder]: FormControl } = {} as {
      [K in keyof Folder]: FormControl;
    };

    this.folderCreateEditDataFormService
      .getMainFields(this.matDialogData)
      .forEach((field) => {
        formConfig[field.key as keyof Folder] = new FormControl(field.value);
      });

    return new FormGroup(formConfig);
  }
}
