import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PDFDocumentProxy, PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'users-add-material-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    PdfViewerModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  templateUrl: './add-material-dialog-component.component.html',
  styleUrls: ['./add-material-dialog-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponentComponent {
  private dialogRef = inject(MatDialogRef<AddMaterialDialogComponentComponent>);

  public myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      // Создайте FormControl для каждого поля в вашей форме
      materialName: new FormControl('', [Validators.required]),
      materialLink: new FormControl('', [Validators.required]),
    });
  }
  public error = '';
  public link = '';
  public loading = false;
  public canCreate = false;
  public materialName = '';
  public materialLink = '';

  onSubmit() {
    if (this.myForm.valid) {
      this.error = '';
      this.loading = true;
      const formData = this.myForm.value;
      this.link = formData.materialLink;
    }
  }

  createMaterial() {
    const formData = this.myForm.value;
    const materialData = {
      title: formData.materialName,
      material_link: formData.materialLink,
    };
    this.dialogRef.close(materialData);
  }

  onError(error: any) {
    this.loading = false;
    this.error = 'Ошибка! Ссылка не прошла проверку!';
  }
  onInput(){
    this.canCreate = false;
    this.error = ""

  }


  callBackFn(pdf: PDFDocumentProxy) {

    this.canCreate = true;
    this.error = '';
    this.loading = false;

   }


}
