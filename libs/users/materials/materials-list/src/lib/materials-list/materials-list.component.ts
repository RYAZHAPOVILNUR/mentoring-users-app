import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Subscription } from 'rxjs';
import {
  IMaterial,
  IMaterialPost,
} from '../../../../data-access/src/lib/models/imaterial';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit, OnDestroy {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  private folderId: number | null = null;
  public materials: IMaterial[] | null = null;
  public isLoading: boolean = true;
  public panelOpenState = false;
  private subscriptions = new Subscription();
  // private materialsSubscription: Subscription | null = null;
  // private refreshFoldersList() {
  //   const refreshSubscription = this.materialService
  //     .getMaterials()
  //     .subscribe((data) => {
  //       this.materials = data;
  //       this.isLoading = false;
  //       this.changeDetectorRef.detectChanges();
  //     });

  //   this.subscriptions.add(refreshSubscription);
  // }

  private refreshFoldersList() {
    const refreshSubscription = this.materialService.getMaterials().subscribe({
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

    this.subscriptions.add(refreshSubscription);
  }

  //TODO: переписать компонент с использованием передачи ID папки через адресную строку
  constructor(
    private materialService: MaterialService,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Извлекает ID папки из хранилища sessionStorage
    if (sessionStorage.getItem('folderId')) {
      this.folderId = Number(sessionStorage.getItem('folderId'));
    }

    // Получает ID папки из текущего роута
    const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
    if (navigationExtras && typeof navigationExtras['data'] === 'number') {
      this.folderId = navigationExtras['data'];
      sessionStorage.setItem('folderId', this.folderId.toString());
    }

    console.log('storage', sessionStorage.getItem('folderId'));
  }

  ngOnInit() {
    // Subscribe to materials and add it to the subscriptions object
    const materialsSubscription = this.materialService
      .getMaterials()
      .subscribe({
        next: (data: IMaterial[]) => {
          this.materials = this.filterMaterialsByFolderId(data, this.folderId);
          console.log('Materials:', this.materials);
          this.isLoading = false;
          this.changeDetectorRef?.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching materials:', error);
        },
      });

    // Add the materials subscription to the collection of subscriptions
    this.subscriptions.add(materialsSubscription);
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
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      folder_id: this.folderId,
    };

    const dialogRef = this.dialog.open(MaterialCreateComponent, dialogConfig);

    const dialogRefSubscription = dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        this.postData(result);
        this.folderId = result.folder_id;
      });
  }

  postData(data: IMaterialPost) {
    this.isLoading = true; // Установка isLoading в true перед началом запроса
    const postSubscription = this.materialService.postMaterial(data).subscribe({
      next: (response) => {
        console.log(response);
        this.refreshFoldersList();
      },
      error: (error) => {
        console.error('Error posting folder:', error);
        this.isLoading = false; // Установка isLoading обратно в false в случае ошибки
      },
      complete: () => {
        this.isLoading = false; // Установка isLoading в false после завершения запроса
      },
    });
    this.subscriptions.add(postSubscription);
  }

  public deleteMaterial(event: Event, materialId: number) {
    event.stopPropagation();
    console.log('Material deleted:', materialId);

    const deleteSubscription = this.materialService
      .deleteMaterial(materialId)
      .subscribe({
        next: (data) => {
          console.log('Material deleted:', data);
          this.refreshFoldersList();
        },
        error: (error) => {
          console.error('Error deleting folder:', error);
        },
      });
    this.subscriptions.add(deleteSubscription);
  }

  openMaterial(material: IMaterial) {
    console.log('Open Material', material.id);
  }

  ngOnDestroy() {
    // Unsubscribes from all subscriptions
    this.subscriptions.unsubscribe();

    // Remove the folderId from sessionStorage
    sessionStorage.removeItem('folderId');
  }
}
