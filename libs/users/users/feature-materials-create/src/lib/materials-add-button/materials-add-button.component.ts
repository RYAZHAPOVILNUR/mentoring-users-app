import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MaterialsAddDialogComponent],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent { }
