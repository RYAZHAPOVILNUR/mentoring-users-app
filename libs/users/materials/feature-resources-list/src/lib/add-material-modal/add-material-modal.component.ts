import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  ADD_MATERIAL_FORM_LIMITS,
  MATERIAL_TYPE,
  MP3_REGEX,
  PDF_REGEX,
  YOUTUBE_REGEX
} from '../../../../util/constant';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorStateMatcher } from '../../../../util/exceptions';
import { tap } from 'rxjs';

const { MATERIAL_LINK, MATERIAL_TITLE } = ADD_MATERIAL_FORM_LIMITS;

@Component({
  selector: 'add-material-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatIconModule],
  templateUrl: './add-material-modal.component.html',
  styleUrls: ['./add-material-modal.component.scss']
})

export class AddMaterialModalComponent {
  public materialFormGroup!: FormGroup;
  public readonly Object = Object;
  public readonly MATERIAL_TYPE = MATERIAL_TYPE;
  public readonly MATERIAL_TITLE = MATERIAL_TITLE;
  public readonly MATERIAL_LINK = MATERIAL_LINK;
  public matcher: FormErrorStateMatcher = new FormErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.createAddMaterialForm();
  }

  private createAddMaterialForm(): void {
    this.materialFormGroup = this.fb.group({
      materialType: [MATERIAL_TYPE.pdf, [Validators.required]],
      title: ['', [
        Validators.required,
        Validators.minLength(MATERIAL_TITLE.MIN_LENGTH),
        Validators.maxLength(MATERIAL_TITLE.MAX_LENGTH)
      ]],
      material_link: ['', [
        Validators.required,
        Validators.minLength(MATERIAL_LINK.MIN_LENGTH),
        Validators.maxLength(MATERIAL_LINK.MAX_LENGTH),
        Validators.pattern(PDF_REGEX)
      ]]
    });

    const materialLinkInput = 'material_link';

    this.materialFormGroup.get(materialLinkInput)?.valueChanges.pipe(
      tap(materialFileType => {
        const baseValidators = [
          Validators.required,
          Validators.minLength(MATERIAL_LINK.MIN_LENGTH),
          Validators.maxLength(MATERIAL_LINK.MAX_LENGTH)
        ];

        switch (materialFileType) {
          case  MATERIAL_TYPE.pdf:
            this.materialFormGroup.get(materialLinkInput)?.setValidators([
              ...baseValidators,
              Validators.pattern(PDF_REGEX)
            ]);
            break;
          case MATERIAL_TYPE.video:
            this.materialFormGroup.get(materialLinkInput)?.setValidators([
              ...baseValidators,
              Validators.pattern(YOUTUBE_REGEX)
            ]);
            break;
          case MATERIAL_TYPE.audio:
            this.materialFormGroup.get(materialLinkInput)?.setValidators([
              ...baseValidators,
              Validators.pattern(MP3_REGEX)
            ]);
        }
        this.materialFormGroup.get(materialLinkInput)?.updateValueAndValidity();
      })
    ).subscribe();
  }
}
