import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'materials-add-btn',
  templateUrl: './materials-add-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatInputModule],
})
export class MaterialsAddDialogComponent {
  private dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  public dialogData: { typeMaterial: string } = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.material = this.formBuilder.group({
      title: ['', Validators.required],
      material_link: ['', Validators.required],
    });
  }

  selectPattern(link: string): boolean {
    switch (this.dialogData.typeMaterial) {
      case '.mp4':
        const videoRegex =
          /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/;
        return videoRegex.test(link);
      case '.pdf':
        const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
        return pdfRegex.test(link);
      case '.mp3':
        const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
        return audioRegex.test(link);
      default: {
        console.error('error type material!');
        return false;
      }
    }
  }

  material = this.formBuilder.group({
    title: ['', Validators.required],
    material_link: ['', Validators.required],
  });

  initNewMaterial(): void {
    if (
      this.material.valid &&
      this.selectPattern(this.material.value.material_link as string)
    ) {
      this.dialogRef.close(this.material.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
