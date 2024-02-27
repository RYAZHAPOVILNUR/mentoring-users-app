import { Component, OnInit, inject } from '@angular/core';
import { FoldersListContainerStore } from './folders-list-container.store';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';
import { FoldersAddComponent } from '../../feature-folders-create/folders-add-btn/folders-add.component';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  templateUrl: './folders-list-container.component.html',
  providers: [FoldersListContainerStore],
  imports: [
    CommonModule,
    FoldersListComponent,
    LetDirective,
    FoldersAddComponent,
  ],
})
export class FoldersListContainerComponent implements OnInit {
  private containerStore = inject(FoldersListContainerStore);
  private router = inject(Router);

  public readonly folders$ = this.containerStore.folders$;
  public readonly isLoading$ = this.containerStore.isLoading$;

  public onPushNewFolder(title: string): void {
    this.containerStore.pushNewFolder(title);
  }

  onDeleteFolder(id: number): void {
    this.containerStore.deleteFolder(+id);
  }

  onSelectFolder(id: number): void {
    this.router.navigate(['/materials', id]);
  }
  ngOnInit() {
    this.containerStore.loadFolders();
  }
}
