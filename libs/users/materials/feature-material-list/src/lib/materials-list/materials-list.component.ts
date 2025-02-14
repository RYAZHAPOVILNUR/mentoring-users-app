import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Folder, Material, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '../../../../feature-materials-create/materials-add-button/materials-add-button.component';
import { MaterialsCardComponent } from './materials-card/materials-card.component';
import { Store } from '@ngrx/store';
import { selectFolders, selectMaterial } from '../../../../data-access/src/lib/+state/materials.selectors';
import { MaterialsContentComponent } from '../../../../feature-materials-content/materials-content/materials-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'users-feature-material-list',
  standalone: true,
  imports: [CommonModule, MaterialsAddButtonComponent, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialListComponent implements OnInit {
  private store = inject(Store);
  readonly activateRouter = inject(ActivatedRoute);
  materialFacade = inject(MaterialsFacade);
  dialog = inject(MatDialog);
  materialTitile$!: Observable<Material[]>;
  folderTitle$!: Observable<string | null>;
  folderId!: string;



  ngOnInit(): void {
    this.folderId = this.activateRouter.snapshot.paramMap.get('id')!;
    this.folderTitle$ = this.store.select(selectFolders).pipe(
      map((folders) => {
        const folder = folders.find((folder) => folder.id === +this.folderId);
        return folder ? folder.title : null;
      })
    )
    this.materialTitile$ = this.store.select(selectMaterial)
    this.materialFacade.initMaterial();
  }
  onOpenMaterial(material: Material){
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
    dialogRef.afterClosed().subscribe()
  }
}
