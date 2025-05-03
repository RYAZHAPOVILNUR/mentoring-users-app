import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials/materials.facade';
import { FoldersFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MaterialsListComponent ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit{
  ngOnInit(): void {
    this.materialsFacade.loadMaterials();
  }

  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  public readonly openedMaterials$ = this.materialsFacade.openedMaterials$;
  public readonly openedFolder$ = this.foldersFacade.openedFolders$;
  public readonly materialStatus$ = this.materialsFacade.materialStatus$;
  public readonly materialsErrors$ = this.materialsFacade.materialsErrors$

  OnBackToFolders(): void {
    this.router.navigate(['/materials'])
  }
}
