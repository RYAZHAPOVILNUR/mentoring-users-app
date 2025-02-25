import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardsComponent } from '../folders-cards/folders-cards.component';
import { FoldersFacade } from '@users/materials/data-access';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddButtonComponent } from '@feature-folders-create';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardsComponent, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, FoldersAddButtonComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListComponent implements OnInit {
  foldersFacade$ = inject(FoldersFacade);
  store = inject(Store)
  readonly dialog = inject(MatDialog);

  folders$ = this.foldersFacade$.folders$;
  isLoading = true;

  ngOnInit() {
    this.foldersFacade$.loadFolders()
    this.folders$.subscribe(() => {
      this.isLoading = false;
    });
  }
}
