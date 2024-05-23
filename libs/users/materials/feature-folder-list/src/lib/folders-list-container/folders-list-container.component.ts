import { Component, OnInit, inject } from '@angular/core';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  imports: [FoldersListComponent, LetDirective],
  standalone: true
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFaced = inject(MaterialsFacade);
  public readonly folders$ = this.materialsFaced.folders$;
  public readonly status$ = this.materialsFaced.status$;

  ngOnInit(): void {
      this.materialsFaced.loadFolders();
  }
}
