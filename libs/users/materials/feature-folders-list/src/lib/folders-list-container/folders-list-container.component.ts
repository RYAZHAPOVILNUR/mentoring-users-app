import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersEntity, materialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { CreateFoldersButtonComponent } from '@users/feature-folders-create';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, CreateFoldersButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListContainerComponent implements OnInit {
  ngOnInit(): void {
    this.materialsFacade.initFolders();
  }

  public materialsFacade = inject(materialsFacade);
  public readonly folders$ = this.materialsFacade.allFolders$;
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  onDeleteFolder(folder: FoldersEntity) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.materialsFacade.deleteFolder(folder.id);
      }
    });
  }

  onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}