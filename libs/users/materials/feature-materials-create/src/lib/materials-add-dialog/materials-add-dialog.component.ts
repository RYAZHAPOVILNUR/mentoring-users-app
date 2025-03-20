import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private formBuilder = inject(FormBuilder);
  public formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { materialType: string; materialsTitle: string; materialLink: string }
  ) {
    this.formGroup = this.formBuilder.group({
      materialsTitle: ['', Validators.required],
      materialLink: ['', Validators.required],
    });
  }

  public isLinkValid(link: string): boolean {
    switch (this.data.materialType) {
      case 'Видео': {
        const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
        return videoRegex.test(link);
      }
      case 'PDF': {
        const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
        return pdfRegex.test(link);
      }
      case 'Подкаст': {
        const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
        return audioRegex.test(link);
      }
      default:
        return true;
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid && this.isLinkValid(this.formGroup.value.materialLink)) {
      const formData = {
        materialsTitle: this.formGroup.value.materialsTitle,
        materialLink: this.formGroup.value.materialLink,
      };
      this.dialogRef.close(formData);
    }
  }
}
