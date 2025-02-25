import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FolderInterface, FoldersFacade, MaterialInterface } from '@users/materials/data-access';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MaterialsAddButtonComponent } from '@feature-materials-create';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatIconModule, MatButtonModule, MaterialsAddButtonComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListComponent implements OnInit {
  folderId!: number;
  folder$!: Observable<FolderInterface | undefined>;
  material$!: Observable<MaterialInterface[]>;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private folderFacade = inject(FoldersFacade);
  private location = inject(Location);

  constructor() {
    this.folderFacade.loadFolders();
    this.folderFacade.loadMaterials();
  }

  ngOnInit() {
    this.folder$ = this.route.paramMap.pipe(
      tap(() => this.isLoading = true),
      map(params => Number(params.get('id'))),
      tap(id => this.folderId = id),
      switchMap(id =>
        this.folderFacade.folders$.pipe(
          map(folders => folders.find(folder => folder.id === id)),
          tap(() => this.isLoading = false)
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    );

    this.material$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id =>
        this.folderFacade.materials$.pipe(
          map(materials => materials.filter(material => material.folder_id === id))
        )
      ),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  goBack() {
    this.location.back();
  }
}
