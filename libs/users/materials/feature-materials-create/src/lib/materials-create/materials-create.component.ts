import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsAddButtonComponent } from '../materials-add-button/materials-add-button.component';

@Component({
  selector: 'users-materials-create',
  standalone: true,
  imports: [CommonModule, MaterialsAddButtonComponent],
  templateUrl: './materials-create.component.html',
  styleUrls: ['./materials-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCreateComponent { }
