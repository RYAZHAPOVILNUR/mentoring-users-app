import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

// Сейчас реализован только фунционал добавления папки. Имеет смысл добавить в этот же компонент функцию переименовывания. Тогда при открытии компонента нужно будет брать данные об имени папки. Как это сделано, можно посмотреть в create-users-dialog и в джуновском задании. Но в ТЗ этого нет, поэтому на мое усмотрение.

@Component({
  selector: 'folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  public formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });
  public readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
      };
      this.dialogRef.close(formData);
    }
  }
}
