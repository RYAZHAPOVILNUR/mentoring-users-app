import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  public readonly data: string = inject(MAT_DIALOG_DATA);

  public folderName = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onAddButton(): void {
    const folder = {
      title: this.folderName.value,
    };
    this.dialogRef.close(folder);
  }
}
