import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {}
