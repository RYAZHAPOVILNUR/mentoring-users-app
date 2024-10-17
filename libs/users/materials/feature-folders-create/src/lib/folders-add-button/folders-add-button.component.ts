import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolderDTO } from '../../../../data-access/src/lib/models/folders-dto.model';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { fromEvent, map, Observable, startWith } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, PushPipe],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddButtonComponent {
  private name!: string;
  public isSticky$: Observable<boolean>;

  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly foldersFacade = inject(FoldersFacade);

  public openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      width: '500px',
      data: { name: this.name }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newFolder: CreateFolderDTO = {
            title: result.title
          };
          this.foldersFacade.addFolder(newFolder);
        }
      });
  }

  constructor() {
    this.isSticky$ = fromEvent(window, 'scroll').pipe(
      map(() => this.isButtonSticky()),
      startWith(this.isButtonSticky())
    );
  }

  private isButtonSticky(): boolean {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    return scrollTop + window.innerHeight < document.body.offsetHeight - 100;
  }
}
