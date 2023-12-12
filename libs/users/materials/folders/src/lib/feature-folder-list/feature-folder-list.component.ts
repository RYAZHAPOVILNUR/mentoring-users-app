import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IFolder } from '../../../../data-access/src/lib/models/ifolder';
import { FolderService } from '../../../../data-access/src/lib/services/folder-service/folder-service.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'users-feature-folder-list',
  standalone: true,
  imports: [
    CommonModule,
    FolderCardComponent,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './feature-folder-list.component.html',
  styleUrls: ['./feature-folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit {
  constructor(private folderService: FolderService) {}

  public folders$!: Observable<IFolder[]>;

  ngOnInit() {
    this.folders$ = this.folderService.getFolders();
  }
}
