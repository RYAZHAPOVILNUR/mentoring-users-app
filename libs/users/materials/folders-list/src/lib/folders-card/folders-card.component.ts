import {
  ChangeDetectionStrategy,
  Component, DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';


@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, TranslateModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) folder!: FolderDTO;

  @Output() deleteFolder = new EventEmitter<number>();
  @Output() revealFolder = new EventEmitter<number>();

  onRevealFolder(id: number): void {
    this.revealFolder.emit(id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      width: '350px',
      data: { dialogText: 'Вы хотите безвозвратно удалить эту папку?' }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(result =>
        result && this.deleteFolder.emit(id))
    )
      .subscribe();
  }
}
