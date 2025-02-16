import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FolderInterface, FoldersFacade } from '@users/materials/data-access';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent implements OnInit{
  folderId!: number
  folder$!: Observable<FolderInterface | undefined>;

  route = inject(ActivatedRoute)
  destroyRef = inject(DestroyRef);
  folderFacade = inject(FoldersFacade)
  location = inject(Location)

  constructor() {
    this.folderFacade.loadFolders()
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.folderId = Number(params.get('id'));
      console.log('Открыта папка с ID:', this.folderId);

      this.folder$ = this.folderFacade.folders$.pipe(
        map(folders => folders.find(folder => folder.id === this.folderId))
      )
    });
  }

  goBack() {
    this.location.back()
  }
}
