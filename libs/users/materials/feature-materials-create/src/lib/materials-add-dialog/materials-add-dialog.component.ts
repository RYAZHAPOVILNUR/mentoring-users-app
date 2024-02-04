import { ChangeDetectionStrategy, Component, Inject, inject, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MaterialsAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  public formGroup: FormGroup = Inject(FormGroup)
  // public formGroup: FormGroup = inject(FormGroup)  почему не сработает? и как луше Inject или через constructor
  public  dialogRef = inject(MatDialogRef);
  public data: {materialType: string, materialTitle: string, materialLink: string} = inject(MAT_DIALOG_DATA)

  // ngOnInit() {
  //   this.initDialog()
  // }

  // initDialog() {
  //   this.formGroup = this.fb.group({
  //     materialTitle: ['', Validators.required],
  //     materialLink: ['', Validators.required]
  //   });
  // }

  constructor() {
    this.formGroup = this.fb.group({
      materialTitle: ['', Validators.required],
      materialLink: ['', Validators.required]
    });
  }

  public isLinkValid(link: string) {
    switch (this.data.materialType) {
      case 'Видео':
        const videoRegex = /(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return videoRegex.test(link);

      case 'PDF':
        const pdfRegex = /^(https?|ftp):\/\/\S+\.pdf$/;
        return pdfRegex.test(link);

      case 'Подкаст':
        const podcastRegex = /^(https?|ftp):\/\/\S+\.mp3$/;
        return podcastRegex.test(link);
    }
    return true;
  }

  onSubmit() {
    if (this.formGroup.valid && this.isLinkValid(this.formGroup.value.materialLink)) {
      const newMaterial = {
        materialTitle: this.formGroup.value.materialTitle,
        materialLink: this.formGroup.value.materialLink
      };
      console.log(newMaterial)
      this.dialogRef.close(newMaterial);
    }
  }
}
