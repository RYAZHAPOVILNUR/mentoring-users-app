import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListViewModel } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersCardComponent } from '../../../../../users/feature-users-list/src/lib/users-card/users-card.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, UsersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true})
  vm!: FoldersListViewModel;
}
