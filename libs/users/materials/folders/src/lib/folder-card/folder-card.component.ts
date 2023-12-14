import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Observable } from 'rxjs';
import { IMaterial } from '../../../../data-access/src/lib/models/imaterial';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
})
export class FolderCardComponent implements OnInit {
  folderId: number | null = 38;
  constructor(
    private materialService: MaterialService,
    private router: Router
  ) {
    const navigationExtras = this.router.getCurrentNavigation()?.extras.state;
    if (navigationExtras && typeof navigationExtras['data'] === 'number') {
      this.folderId = navigationExtras['data'];
    }
    console.log(this.folderId);
  }

  ngOnInit() {}

  public materials$: Observable<IMaterial[]> =
    this.materialService.getMaterials();
}
