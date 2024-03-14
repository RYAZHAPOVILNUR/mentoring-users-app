import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { MaterialsListComponent } from './../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MaterialsRemoveDialogComponent } from '../materials-remove-dialog/materials-remove-dialog.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsAddButtonComponent,
    MaterialsListComponent,
    LetDirective,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  public materials$ = this.materialsFacade.materials$;
  public openedFolder$ = this.materialsFacade.openedFolder$;
  public status$ = this.materialsFacade.status$;
  public error$ = this.materialsFacade.error$;
  public dialog = inject(MatDialog);
  public title!: string;

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  ngOnInit() {
    this.materialsFacade.openedFolder$.subscribe((openedFolder) => {
      if (openedFolder) {
        this.title = openedFolder.title;
      }
    });
  }

  onDeleteMaterial(material: IMaterial) {
    const dialogRef = this.dialog.open(MaterialsRemoveDialogComponent, {
      data: { material },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialsFacade.deleteMaterial(material.id);
      }
    });
  }
}
