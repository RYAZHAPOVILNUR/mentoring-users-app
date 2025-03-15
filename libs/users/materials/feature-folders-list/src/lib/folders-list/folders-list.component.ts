import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  readonly store = inject(Store);
}
