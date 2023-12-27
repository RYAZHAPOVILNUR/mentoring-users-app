import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  IMaterial,
  IMaterialPost,
} from '../../../../data-access/src/lib/models/imaterial';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
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
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  private folderId: number;
  public materials: IMaterial[] | null = null;
  public isLoading = true;
  public panelOpenState = false;

  public trackByMaterialId(index: number, material: IMaterial): number {
    return material.id;
  }
  private refreshFoldersList() {
    this.materialService
      .getMaterials()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.materials = this.filterMaterialsByFolderId(data, this.folderId);
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching materials:', error);
          this.isLoading = false;
        },
      });
  }

  //TODO: переписать компонент с использованием передачи ID папки через адресную строку(написать резолвер)
  constructor(
    private materialService: MaterialService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.folderId = Number(this.router.snapshot.params['id']);
    console.log(this.folderId);

    // Извлекает ID папки из хранилища sessionStorage
    // if (sessionStorage.getItem('folderId')) {
    //   this.folderId = Number(sessionStorage.getItem('folderId'));
    // }

    // // Получает ID папки из текущего роута
    // const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
    // if (navigationExtras && typeof navigationExtras['data'] === 'number') {
    //   this.folderId = navigationExtras['data'];
    //   sessionStorage.setItem('folderId', String(this.folderId));
    // }

    // console.log('storage', sessionStorage.getItem('folderId'));
  }

  ngOnInit() {
    this.materialService
      .getFolderMaterials(this.folderId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: IMaterial[]) => {
          this.materials = data;
          console.log('Materials:', this.materials);
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching materials:', error);
        },
      });
  }

  // Метод для фильтрации материалов по ID папки
  filterMaterialsByFolderId(
    data: IMaterial[],
    folderId: number | null
  ): IMaterial[] {
    if (folderId === null) {
      return data; // Return the whole array if folderId is null
    }
    return data.filter((material) => material.folder_id === folderId);
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (!result) return;
        this.postData(result);
        this.folderId = result.folder_id;
      });
  }

  postData(data: IMaterialPost) {
    this.isLoading = true; // Установка isLoading в true перед началом запроса
    this.materialService
      .postMaterial(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.refreshFoldersList();
        },
        error: (error) => {
          console.error('Error posting folder:', error);
          this.isLoading = false; // Установка isLoading обратно в false в случае ошибки
        },
      });
  }

  public deleteMaterial(event: Event, materialId: number) {
    event.stopPropagation();
    console.log('Material deleted:', materialId);

    this.materialService
      .deleteMaterial(materialId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Material deleted:', data);
          this.refreshFoldersList();
        },
        error: (error) => {
          console.error('Error deleting folder:', error);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();

    // Remove the folderId from sessionStorage
    sessionStorage.removeItem('folderId');
  }
}
