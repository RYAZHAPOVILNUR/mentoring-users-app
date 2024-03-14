import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IMaterialCreate, MaterialsFacade } from '@users/materials/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialsAddService } from '../materials-add-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomLinkValidator } from './../materials-add-validator';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent implements OnInit {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private materialsAddService = inject(MaterialsAddService);
  public dialogTitle!: string;
  private readonly destroyRef = inject(DestroyRef);
  private materialsFacade = inject(MaterialsFacade);
  private openedFolderId!: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IMaterialCreate) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      link: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomLinkValidator.validate(),
        ],
      ],
    });
  }

  ngOnInit() {
    this.materialsAddService.dialogTitle$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newTitle) => {
        this.dialogTitle = newTitle;
      });

    this.materialsFacade.openedFolder$.subscribe((openedFolder) => {
      if (openedFolder) {
        this.openedFolderId = openedFolder.id;
      }
    });
  }

  onSaveData(): void {
    const formData = {
      title: this.formGroup.value.name,
      link: this.formGroup.value.link,
      id: this.openedFolderId,
    };
    this.dialogRef.close(formData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
