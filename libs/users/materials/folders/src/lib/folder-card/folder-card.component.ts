import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MaterialService } from '../../../../data-access/src/lib/services/material-service/material-service.service';
import { Observable } from 'rxjs';
import { IMaterial } from '../../../../data-access/src/lib/models/imaterial';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
})
export class FolderCardComponent {
  constructor(private materialService: MaterialService) {}
  public materials$: Observable<IMaterial[]> =
    this.materialService.getMaterials();
}
