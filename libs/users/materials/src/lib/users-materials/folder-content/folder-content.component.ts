import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialsActions, MaterialsFacade } from '@users/materials/data-access';
import { MaterialViewerComponent } from '../material-content/material-viewer/material-viewer.component';

@Component({
  selector: 'users-folder-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MaterialViewerComponent
  ],
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  
  folder$ = this.materialsFacade.selectedFolder$;

  ngOnInit(): void {
    const folderId = this.route.snapshot.params['id'];
    if (folderId) {
      this.materialsFacade.openFolder();
      this.materialsFacade.loadMaterials();
    }
  }

  backOnFolders(): void {
    this.store.dispatch(MaterialsActions.resetState());
    this.materialsFacade.loadFolders();
    this.router.navigate(['/materials']);
  }
}