import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    MatProgressBarModule,
    NgFor
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM

  rackByFuntion(index: number) {
    return index;
  }
}
