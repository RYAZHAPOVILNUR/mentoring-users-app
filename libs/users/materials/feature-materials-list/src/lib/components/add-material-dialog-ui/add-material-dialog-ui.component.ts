import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialForm, MaterialFormGroupService } from '@users/materials/data-access';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '@core/text-field';


type AddMaterialDialogRef = MatDialogRef<AddMaterialDialogUiComponent, MaterialForm>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,
    MatDialogModule,
    InputFieldComponent
  ],
  templateUrl: './add-material-dialog-ui.component.html',
  styleUrls: ['./add-material-dialog-ui.component.scss'],
  providers: [
    MaterialFormGroupService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMaterialDialogUiComponent {
  private readonly dialogRef: AddMaterialDialogRef = inject(MatDialogRef);
  readonly materialFormGroup = inject(MaterialFormGroupService).getMaterialFormGroup();

  onDoneButtonClick(): void {
    const { title, materialLink } = this.materialFormGroup.getRawValue();
    this.dialogRef.close({
      title,
      materialLink
    });
  }
}
