import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersVM } from '@users/materials/data-access';
import { Router } from '@angular/router';



@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent,  FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {

  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly router = inject(Router);

  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$; 
  

  onDeleteFolder(folder: FoldersVM){
    this.componentStore.deleteFolder(folder);
  }

  public onOpenFolder(id: number) {
    this.router.navigate([`/materials/`, id])
  }
}