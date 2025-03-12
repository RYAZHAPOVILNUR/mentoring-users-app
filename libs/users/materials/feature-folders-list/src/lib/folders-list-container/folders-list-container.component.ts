import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FoldersListComponent } from "../folders-list/folders-list.component";
import { foldersFacade, IFolder } from "@users/materials/data-access";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  
  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }
  
  public foldersFacade = inject(foldersFacade);
  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly foldersStatus$ = this.foldersFacade.foldersStatus$;
  public readonly errors$ = this.foldersFacade.foldersErrors$;
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  
  onDeleteFolder(folder: IFolder) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: 'Вы хотите удалить ${folder.title}?' },
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.foldersFacade.deleteFolder(folder.id);
      }
    })
  }
  
  onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
