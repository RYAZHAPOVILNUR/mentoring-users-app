import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    NgFor,
    NgIf,
    AsyncPipe],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore]
})
export class FoldersListContainerComponent {
 private readonly componentStore = inject(FoldersListContainerStore)
  public readonly folders$ = this.componentStore.folders$
  
  constructor() {
    this.componentStore.loadFolders();
  }

}
