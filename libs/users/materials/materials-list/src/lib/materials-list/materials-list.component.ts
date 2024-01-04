import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialsFeature } from '@users/materials/data-access';
import { catchError, tap } from 'rxjs';
import { IMaterial, IMaterialPost } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MaterialCreateComponent } from '../material-create/material-create.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YtubePipe } from './ytube-pipe/ytube-pipe.pipe';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Store } from '@ngrx/store';
import { MaterialsActions } from '@users/materials/data-access';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    PdfViewerModule,
    YtubePipe,
    NgxExtendedPdfViewerModule,
    PushPipe,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private folderId: number;
  public materials$ = this.store.select(materialsFeature.selectMaterials);
  public status$ = this.store.select(materialsFeature.selectStatus);

  public trackByMaterialId(index: number, material: IMaterial): number {
    return material.id;
  }

  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.folderId = Number(this.router.snapshot.params['id']);
    console.log(this.folderId);
  }

  ngOnInit() {
    this.store.dispatch(MaterialsActions.loadMaterials({ id: this.folderId }));
  }

  public openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      folder_id: this.folderId,
    };

    const dialogRef = this.dialog.open(MaterialCreateComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (!result) return;
          this.postData(result);
          this.folderId = result.folder_id;
        }),
        catchError(() => {
          return [];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  postData(data: IMaterialPost) {
    this.store.dispatch(MaterialsActions.createMaterial({ material: data }));
  }

  public deleteMaterial(event: Event, materialId: number) {
    event.stopPropagation();
    this.store.dispatch(MaterialsActions.deleteMaterial({ id: materialId }));
  }
}
