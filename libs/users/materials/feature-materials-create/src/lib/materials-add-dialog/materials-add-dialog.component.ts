import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent implements OnInit {
  readonly dialogTitle = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private materialsFacade = inject(MaterialsFacade);
  public form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    material_link: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  public isValidState = false;

  ngOnInit() {
    this.form.controls.material_link.valueChanges.subscribe((link) => {
      this.isValidState = this.isLinkValid(link);
    });
  }

  public isLinkValid(link: string): boolean {
    if (this.dialogTitle === 'Видео') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;

      return videoRegex.test(link);
    }

    if (this.dialogTitle === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
      return pdfRegex.test(link);
    }

    if (this.dialogTitle === 'Подкаст') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
      return audioRegex.test(link);
    }

    return true;
  }

  public save(): void {
    this.materialsFacade.addMaterials({
      title: this.form.value.title ?? '',
      material_link: this.form.value.material_link ?? '',
    });

    this.dialogRef.close(this.form.value);
  }
}
