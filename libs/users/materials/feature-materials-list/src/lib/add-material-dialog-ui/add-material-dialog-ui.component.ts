import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AddFolderDialogUiComponent } from '@users/materials/feature-folders-list';
import { Material } from '@users/materials/data-access';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

type AddDialogRef = MatDialogRef<AddFolderDialogUiComponent, Partial<Material>>

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-material-dialog-ui.component.html',
  styleUrls: ['./add-material-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMaterialDialogUiComponent {
  private readonly dialogRef: AddDialogRef = inject(MatDialogRef);

  readonly inputLinkControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern(/\.mp3$|\.pdf$|youtube|youtu.be/)
  ]);

  onDoneButtonClick(title: string, material_link: string): void {
    this.dialogRef.close({ title, material_link });
  }

}

