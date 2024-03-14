import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { IFolder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { FoldersRemoveDialogComponent } from '../folders-remove-dialog/folders-remove-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    FoldersAddButtonComponent,
    LetDirective,
    MatDialogModule,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  public materials$ = this.materialsFacade.materials$;
  public status$ = this.materialsFacade.status$;
  public error$ = this.materialsFacade.error$;
  public dialog = inject(MatDialog);
  public folder!: IFolder;

  ngOnInit() {
    this.materialsFacade.loadFolders();
  }

  onDeleteCard(folder: IFolder) {
    const dialogRef = this.dialog.open(FoldersRemoveDialogComponent, {
      data: { folder },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialsFacade.deleteFolder(folder.id);
      }
    });
  }

  onOpenFolder(folder: IFolder) {
    this.materialsFacade.openFolder(folder);
  }
}
