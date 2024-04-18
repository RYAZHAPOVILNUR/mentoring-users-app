import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@users/features-materials-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly materialFacade = inject(MaterialsFacade);

  public readonly folders$ = this.materialFacade.allFolders$;
  public readonly error$ = this.materialFacade.error$;
  public readonly status$ = this.materialFacade.loaded$;

  ngOnInit(): void {
    this.materialFacade.init();
  }

  public onDeleteFolder(id: number): void {
    this.materialFacade.onDeleteFolder(id);
  }
}
