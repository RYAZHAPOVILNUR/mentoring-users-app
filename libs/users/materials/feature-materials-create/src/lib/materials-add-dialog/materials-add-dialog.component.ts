import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsAddDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef: MatDialogRef<MaterialsAddDialogComponent> = inject(MatDialogRef);
  // public data: { name: string } = inject(MAT_DIALOG_DATA);
  public materialsFacade = inject(MaterialsFacade);
  private route = inject(ActivatedRoute);
  // public data: { folderId: number | null } = inject(MAT_DIALOG_DATA);



  constructor(@Inject(MAT_DIALOG_DATA) public data: { folderId: number | null }) {
    console.log('Data received in dialog:', data.folderId);
    if (this.data.folderId === null) {
      console.error('Received null Folder ID in dialog data');
    } else {
      console.log('Received Folder ID in dialog data:', this.data.folderId);
    }
  }

  public readonly materialsFormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    type: ['', Validators.required,],
    material_link: ['', Validators.required,]
  });

  public onSave(): void {
    const folderId = this.data.folderId
    const formValue = this.materialsFormGroup.value;
      if (this.materialsFormGroup.valid && folderId !== null) {
        const materialData: CreateMaterialDTO = {
          title: formValue.title ?? '',
          type: (formValue.type as 'video' | 'pdf' | 'podcast') ?? 'video',
          material_link: formValue.material_link ?? '',
          folder_id: folderId
        };
        console.log('Data being sent to server:', materialData);
        this.materialsFacade.addMaterial(materialData);
        this.dialogRef.close(materialData);
      } else {
        console.error('Folder ID is null')
      }
  }
  public onCancel() {
    this.dialogRef.close();
  }
}
