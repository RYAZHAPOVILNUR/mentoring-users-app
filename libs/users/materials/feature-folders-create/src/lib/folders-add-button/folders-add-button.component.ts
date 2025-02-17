import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { CreateFolderDTO, FoldersFacade } from '@users/materials/data-access';


@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private title!: string;
  private readonly foldersFacade = inject(FoldersFacade);
  readonly dialog = inject(MatDialog)
  OpenDialog(): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      data: {title: this.title}
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          const newFolderData: CreateFolderDTO = {
            title: result.title,
            id: 0,
            created_at: 0
          };
          this.foldersFacade.addFolder(newFolderData);
        }
      });
    };
  }

