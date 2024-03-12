import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { FeatureMaterialsCardComponent } from '../feature-materials-card/feature-materials-card.component';
import { PushPipe } from '@ngrx/component';
import { FeatureMaterialsAddBtnComponent } from '../feature-materials-add-btn/feature-materials-add-btn.component';

@Component({
  selector: 'users-feature-materials-container',
  standalone: true,
  imports: [CommonModule, FeatureMaterialsCardComponent, FeatureMaterialsAddBtnComponent, PushPipe],
  templateUrl: './feature-materials-container.component.html',
  styleUrls: ['./feature-materials-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureMaterialsContainerComponent implements OnInit {
  private readonly facade = inject(MaterialsFacade)
  public openedFolder$ = this.facade.openedFolder$
  public filteredMaterials$ = this.facade.filteredMaterials$


  ngOnInit(): void {
    this.facade.loadMaterials()
  }
}
