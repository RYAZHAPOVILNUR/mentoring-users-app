import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Subscription } from 'rxjs';
import { IMaterial } from '../../../../data-access/src/lib/models/imaterial';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit, OnDestroy {
  private folderId: number | null = 38;
  public materials: IMaterial[] | null = null;
  private materialsSubscription: Subscription | null = null;

  constructor(
    private materialService: MaterialService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
    if (navigationExtras && typeof navigationExtras['data'] === 'number') {
      this.folderId = navigationExtras['data'];
    }
    console.log(this.folderId);
  }

  ngOnInit() {
    this.materialsSubscription = this.materialService.getMaterials().subscribe({
      next: (data: IMaterial[]) => {
        this.materials = data;
        console.log('Materials:', this.materials);
        this.changeDetectorRef?.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching materials:', error);
      },
    });
  }

  ngOnDestroy() {
    if (this.materialsSubscription) {
      this.materialsSubscription.unsubscribe();
    }
  }
}
