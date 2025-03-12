import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FoldersAddDialogComponent],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private dialog = inject(MatDialog);


  openDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      width: '450px',
    });
    }
  }


