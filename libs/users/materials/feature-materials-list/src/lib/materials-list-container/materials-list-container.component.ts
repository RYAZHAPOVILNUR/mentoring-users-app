import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { TMaterialDTO } from '@users/materials/data-access';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, AsyncPipe],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  constructor() {
    console.log('materials-list-container init');
  }

  public onDeleteMaterial(material: TMaterialDTO): void {
    console.log('delete material: ' + material);
  }

  public onRedirectToMaterialContent(id: number): void {
    console.log('rediret to material: ' + id);
  }
}
