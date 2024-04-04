import { LetDirective } from '@ngrx/component';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, MatProgressBarModule, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);

  public folders$ = this.materialsFacade.folders$;
  public isLoading$ = this.materialsFacade.isLoading$;

  ngOnInit(): void {
    this.materialsFacade.init();
  }
}
