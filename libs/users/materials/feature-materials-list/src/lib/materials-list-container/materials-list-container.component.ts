import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent implements OnInit {
  public MaterialsFacade = inject(MaterialFacade)

  ngOnInit(): void {
    this.MaterialsFacade.loadMaterials()
  }
}
