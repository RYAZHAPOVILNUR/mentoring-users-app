import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Subscription } from 'rxjs';
import { IMaterial } from '../../../../data-access/src/lib/models/imaterial';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit, OnDestroy {
  private folderId: number | null = null;
  public materials: IMaterial[] | null = null;
  public isLoading: boolean = true;
  private materialsSubscription: Subscription | null = null;

  //TODO: переписать компонент с использованием передачи ID папки через адресную строку
  constructor(
    private materialService: MaterialService,
    private router: Router,

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
    // Получает материалы через подписку и фильтрует их по ID папки
    this.materialsSubscription = this.materialService.getMaterials().subscribe({
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

  openDialog() {}

  deleteMaterial() {}

  openMaterial() {}

  ngOnDestroy() {
    // Очищает подписку
    if (this.materialsSubscription) {
      this.materialsSubscription.unsubscribe();
    }
    // Удаляет ID папки из хранилища sessionStorage
    if (sessionStorage.getItem('folderId')) {
      sessionStorage.removeItem('folderId');
    }
  }
}
