import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialsEntity } from '@users/materials/data-access';
import { DefineMaterialTypePipe, MaterialType } from '../../../../pipes/materialType.pipe';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DefineMaterialTypePipe],
})
export class AddMaterialDialogComponent {
  public readonly dialogData = inject(MAT_DIALOG_DATA);
  private materialTypePipe = inject(DefineMaterialTypePipe);
  isSupported = true;

  public materialData = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    materialLink: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  ngOnInit(): void {
    this.materialData.get('materialLink')!.valueChanges.subscribe((value) => {
      const type = this.materialTypePipe.transform(value!);

      type === 'audiotrack'
        ? (this.isSupported = false)
        : type === 'picture_as_pdf'
        ? (this.isSupported = false)
        : type === 'ondemand_video'
        ? (this.isSupported = false)
        : (this.isSupported = true);
    });
  }

  isSupportedMaterial(type: MaterialType): boolean {
    return [MaterialType.AUDIO, MaterialType.PDF, MaterialType.VIDEO].includes(type);
  }

  get materialWithUpdatedFields() {
    return {
      ...this.materialData.value,
      createdAt: new Date().getTime(),
      folderId: this.dialogData.folder.id,
    };
  }
}
