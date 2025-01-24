import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
    // public formGroup: FormGroup;
    // private formBuilder = inject(FormBuilder);
    // public dialogRef = inject(MatDialogRef<CreateUsersDialogComponent>);
  
    // constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string; email: string }) {
    //   this.formGroup = this.formBuilder.group({
    //     name: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //   });
    // }
  
    // cancel(): void {
    //   this.dialogRef.close();
    // }
  
    // save(): void {
    //   if (this.formGroup.valid) {
    //     const formData = {
    //       name: this.formGroup.value.name,
    //       email: this.formGroup.value.email.trim().toLowerCase(),
    //     };
    //     this.dialogRef.close(formData);
    //   }
    // }
}
