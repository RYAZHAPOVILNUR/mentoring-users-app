import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent implements OnInit  {
  private dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>)
  public data = inject(MAT_DIALOG_DATA);
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      newTitle: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]),
      newLink: new FormControl('', [Validators.required, Validators.minLength(1)]),
      folderId: new FormControl(this.data.folderId)
    })
  }

  public isLinkValid(link: string): boolean {
    if (this.data.materialType === 'video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/
      return videoRegex.test(link);
    }

    if (this.data.materialType === 'document') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/
      return pdfRegex.test(link);
    }

    if (this.data.materialType === 'audio') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/
      return audioRegex.test(link);
    }
    return true;
  }

  addSave() {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.newTitle,
        material_link: this.formGroup.value.newLink,
        folder_id: this.formGroup.value.folderId,
      }
      this.dialogRef.close(formData)
    }
  }

  addClose(){
    this.dialogRef.close();
  }
}
