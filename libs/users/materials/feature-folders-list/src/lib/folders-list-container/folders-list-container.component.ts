import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { LetDirective } from '@ngrx/component';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, LetDirective, FoldersCardComponent, FoldersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.materialsFacade.folders$;
  public readonly errors$ = this.materialsFacade.errors$;
  public readonly status$ = this.materialsFacade.status$;

  ngOnInit() {
    this.materialsFacade.init();
  }

  deleteFolder(id: number) {
    this.materialsFacade.deleteFolder(id);
  }

  openFolder(id: number) {
    this.router.navigate(['/materials', id])
  }
}
