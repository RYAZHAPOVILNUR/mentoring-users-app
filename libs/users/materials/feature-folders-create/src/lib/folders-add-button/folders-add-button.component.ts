import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FoldersFacade } from '@users/materials/data-access';
import { Subject, takeUntil } from 'rxjs';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-button-add-folders',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent implements OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly FoldersFacade = inject(FoldersFacade);

  private readonly unsubscribe$ = new Subject<void>();

  public openDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      height: '250px',
      width: '300px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$)) 
      .subscribe((result) => {
        if (result) {
          this.FoldersFacade.addFolder(result);
          this.unsubscribe$.next();
          this.unsubscribe$.complete();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}