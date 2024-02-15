import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MATERIAL_TYPE } from '../../../../util/constant';

@Component({
  selector: 'add-material-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './add-material-modal.component.html',
  styleUrls: ['./add-material-modal.component.scss']
})
export class AddMaterialModalComponent {
  public materialFormGroup: FormGroup = new FormGroup({
    materialType: new FormControl(MATERIAL_TYPE.pdf),
    title: new FormControl(''),
    material_link: new FormControl('')
  });

  public readonly Object = Object;
  public readonly MATERIAL_TYPE = MATERIAL_TYPE;
}
