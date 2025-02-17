import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private sanitizer = inject(DomSanitizer);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; material_link: string; folder_id: string }) {
    this.formGroup = this.formBuilder.group({
      title: [this.data.title || '', Validators.required],
      material_link: [this.data.material_link || '', [Validators.required, Validators.pattern(/^https?:\/\/\S+/)]],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        material_link: this.formGroup.value.material_link.trim(),
        folder_id: this.data.folder_id,
      };
      this.dialogRef.close(formData);
    }
  }

  getSanitizedUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
