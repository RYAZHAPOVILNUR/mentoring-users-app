import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { materialType: string, materialTitle: string, materialLink: string },) {
    this.formGroup = this.formBuilder.group({
      materialTitle: ['', Validators.required],
      materialLink: ['', Validators.required]
    })
  }

  public readonly formGroup: FormGroup = this.formBuilder.group({
    materialTitle: ['', Validators.required],
    materialLink: ['', Validators.required],
  });

  public isLinkValid(link: string): boolean {
    const materialType = this.data.materialType;

    if (materialType === 'Video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
      return videoRegex.test(link);
    }

    if (materialType === 'PDF') {
      return link.startsWith('http') && link.endsWith('.pdf');
    }

    if (materialType === 'Audio') {
      return link.startsWith('http') && link.endsWith('.mp3');
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
