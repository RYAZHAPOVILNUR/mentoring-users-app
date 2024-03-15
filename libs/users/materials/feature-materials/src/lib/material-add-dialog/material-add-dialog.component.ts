import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-material-add-dialog',
  standalone: true,
  imports: [
    CommonModule,     
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './material-add-dialog.component.html',
  styleUrls: ['./material-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { materialType: string },) {
    this.formGroup = this.formBuilder.group({
      materialTitle: ['', Validators.required],
      materialLink: ['', Validators.required]
    })
  }

  public isLinkValid(link: string): boolean {
    if (this.data.materialType === 'Video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/
      return videoRegex.test(link);
    }

    if (this.data.materialType === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/
      return pdfRegex.test(link);
    }

    if (this.data.materialType === 'Podcast') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/
      return audioRegex.test(link);
    }

    return true;
  }

  public close(): void {
    this.dialogRef.close()
  }

  public save(): void {
    if (this.formGroup.valid && this.isLinkValid(this.formGroup.value.materialLink)) {
      const newMaterial = {
        materialTitle: this.formGroup.value.materialTitle,
        materialLink: this.formGroup.value.materialLink
      }

      this.dialogRef.close(newMaterial)
    }
  }
}
