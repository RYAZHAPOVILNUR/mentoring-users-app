import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialType } from '../interfaces/material-type';

@Component({
  selector: 'users-materials-add-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrl: './materials-add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent implements OnInit {
  public readonly dialogRef = inject(MatDialogRef);
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly materialType: MaterialType = this.data.type;

  public readonly form = inject(FormBuilder).group({
    title: ['', Validators.required],
    material_link: [''],
  });

  public readonly regex: Record<MaterialType, RegExp> = {
    video:
      /^(https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]{11}(?:[&?]\S*)*|youtu\.be\/[\w-]{11}|[\w.-]+\/\S+\.mp4))$/,
    pdf: /^(https:\/\/[\w.-]+\/\S+\.pdf)$/,
    audio: /^(https:\/\/[\w.-]+\/\S+\.mp3)$/,
  };

  public readonly iconMap: Record<MaterialType, string> = {
    video: 'live_tv',
    pdf: 'picture_as_pdf',
    audio: 'audiotrack',
  };

  ngOnInit(): void {
    this.updateLinkValidators(this.materialType);
  }

  private updateLinkValidators(type: MaterialType) {
    const control = this.form.get('material_link');
    control?.setValidators([Validators.required, Validators.pattern(this.regex[type])]);
    control?.updateValueAndValidity();
  }

  cancelDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
