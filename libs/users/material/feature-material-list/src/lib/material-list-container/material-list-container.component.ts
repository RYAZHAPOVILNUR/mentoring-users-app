import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from '../material-list/material-list.component';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';
import { Material, MaterialFacade } from '@users/material';
import { MaterialAddButtonComponent } from '@users/material-create';
import { MatDialog } from '@angular/material/dialog';
import { MaterialContentComponent } from '@users/material-content';

@Component({
  selector: 'users-material-list-container',
  standalone: true,
  imports: [CommonModule, MaterialListComponent, LetDirective, MaterialAddButtonComponent],
  templateUrl: './material-list-container.component.html',
  styleUrls: ['./material-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListContainerComponent {
  private readonly router = inject(Router);
  public readonly dialog = inject(MatDialog);
  private readonly materialFacade = inject(MaterialFacade);
  public readonly materials$ = this.materialFacade.openedMaterial$;
  public readonly status$ = this.materialFacade.status$;
  public readonly error$ = this.materialFacade.error$;
  public readonly folderName$ = this.materialFacade.getValueFromUrl('name');

  constructor() {
    this.initMaterials();
  }

  private initMaterials(): void {
    this.materialFacade.initMaterials();
  }

  public onToFolderList(): void {
    this.router.navigate(['materials']);
  }

  public onOpenMaterial(material: Material): void {
    this.dialog.open(MaterialContentComponent, {
      data: material,
    });
  }

  public onDeleteMaterial(id: number): void {
    this.materialFacade.deleteMaterial(id);
  }
}
