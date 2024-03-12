import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { FoldersActions, MaterialsFacade } from '@users/materials/data-access'
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router'
@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private route = inject(Router)
  public readonly materialsFacade = inject(MaterialsFacade)
  public readonly folders$ = this.materialsFacade.folders$
  public readonly status$ = this.materialsFacade.folderStatus$

  ngOnInit(): void {
    this.materialsFacade.loadFolders()
  }

  public onDeleteFolder(id: number) {
    this.materialsFacade.deleteFolder(id)
  }
  public onRedirectToMaterials(params: { id: number; folderName: string }) {
    this.route.navigate(['/materials', params.id], { queryParams: { folderName: params.folderName } })
  }
}
