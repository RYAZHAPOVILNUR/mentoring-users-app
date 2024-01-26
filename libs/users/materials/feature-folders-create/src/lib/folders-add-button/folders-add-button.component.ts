import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog)

  addFolder() {
    this.dialog.open(FoldersAddDialogComponent, {
      data: {
        width: '250px'
      }
    })
  }


}
