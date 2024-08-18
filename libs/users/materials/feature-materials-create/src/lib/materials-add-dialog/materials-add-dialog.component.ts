import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  public readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  // private readonly regexValidateLink = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private readonly regexValidateLink = '/^((ftp|http|https):\/\/)?([a-z0-9_\.-]+)\.{1}([a-z0-9_\/\?\=\-\%-]+)$/';

  public formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    // link: ['', [Validators.required, Validators.pattern(this.regexValidateLink)]],
    link: ['', [Validators.required]],
  });

  cancel(){
    this.dialogRef.close()
  }
  save(){
    if(this.formGroup.valid){
      const formData = {
        title: this.formGroup.value.title,
        link: this.formGroup.value.link
      }
      this.dialogRef.close(formData)
    };
  }
}
