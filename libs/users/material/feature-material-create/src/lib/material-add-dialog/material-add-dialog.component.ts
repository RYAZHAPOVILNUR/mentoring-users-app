import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-material-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, MatInputModule],
  templateUrl: './material-add-dialog.component.html',
  styleUrls: ['./material-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddDialogComponent {
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialAddDialogComponent>);
  public data: { title: string; link: string; typeOfMaterial: string } = inject(MAT_DIALOG_DATA);
  public formGroup: FormGroup;

  constructor() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  public isValidLink(link: string): boolean {
    if (this.data.typeOfMaterial === 'Video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
      return videoRegex.test(link);
    }

    if (this.data.typeOfMaterial === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
      return pdfRegex.test(link);
    }

    if (this.data.typeOfMaterial === 'Audio') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
      return audioRegex.test(link);
    }
    return true;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public create(): void {
    if (this.formGroup.valid) {
      const dataFolder = {
        title: this.formGroup.value.title,
        link: this.formGroup.value.link,
      };
      console.log('create close');
      this.dialogRef.close(dataFolder);
    }
  }
}
