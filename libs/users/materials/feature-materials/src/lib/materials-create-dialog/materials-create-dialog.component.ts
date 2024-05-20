import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'users-materials-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-create-dialog.component.html',
  styleUrls: ['./materials-create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCreateDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<MaterialsCreateDialogComponent>);
  private readonly dialogData: {
    materialType: string;
    materialTitle: string;
    materialLink: string;
    validatationPattern: RegExp;
  } = inject(MAT_DIALOG_DATA);

  public materialForm!: FormGroup;
  public materialType!: string;

  ngOnInit(): void {
    this.materialType = this.dialogData.materialType;
    this.materialForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      material_link: new FormControl('', [Validators.required]),
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onCreate(): void {
    this.dialogRef.close(this.materialForm.value);
  }
}
