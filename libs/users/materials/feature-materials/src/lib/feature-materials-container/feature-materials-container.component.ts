import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-feature-materials-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-container.component.html',
  styleUrls: ['./feature-materials-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureMaterialsContainerComponent implements OnInit {
  private readonly facade = inject(MaterialsFacade)
  public openedFolder = this.facade.openedFolder$

  ngOnInit(): void {
    this.facade.loadMaterials()
  }
}
