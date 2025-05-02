import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterialDTO, MaterialFormat, MaterialsFacade } from '@users/materials/data-access';

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
  private readonly materialsFacade = inject(MaterialsFacade);

  public data: {
    folder_id: number;
    materialFormat: string;
    materialTitle: string;
    materialLink: string;
  } = inject(MAT_DIALOG_DATA);

  public readonly formGroup: FormGroup = this.formBuilder.group({
    materialTitle: ['', Validators.required],
    materialLink: ['', Validators.required],
  });

  public isLinkValid(link: string): boolean {
    const materialFormat = this.data.materialFormat;

    if (materialFormat === 'Video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
      return videoRegex.test(link);
    }

    if (materialFormat === 'PDF') {
      return link.startsWith('http') && link.endsWith('.pdf');
    }

    if (materialFormat === 'Audio') {
      return link.startsWith('http') && link.endsWith('.mp3');
    }

    return true;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid && this.isLinkValid(this.formGroup.value.materialLink)) {
      const newMaterial: CreateMaterialDTO = {
        title: this.formGroup.value.materialTitle,
        material_link: this.formGroup.value.materialLink,
        material_format: this.data.materialFormat as MaterialFormat, 
        folder_id: this.data.folder_id,
      };

      this.materialsFacade.addMaterial(newMaterial); 
      this.dialogRef.close();
    }
  }
}
