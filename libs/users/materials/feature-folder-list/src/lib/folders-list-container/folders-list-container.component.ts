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
  materialsFaced = inject(MaterialsFacade);
  folders$ = this.materialsFaced.folders$

  ngOnInit(): void {
      this.materialsFaced.init();
  }

}
