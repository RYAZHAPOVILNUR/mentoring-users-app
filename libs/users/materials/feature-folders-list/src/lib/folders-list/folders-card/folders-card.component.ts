import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
  DestroyRef, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Folder, MaterialsFacade } from '@users/materials/facade';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  materialsFacade = inject(MaterialsFacade);
  private dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  @Output() selectFolder = new EventEmitter<void>();
  @Input() folder!: Folder;
  @Input() isSelected = false;

  getTitleLenght(value: string) {
    if (value.length >= 10) {
      return value.split('').slice(0, 9).join('') + '...';
    } else {
      return value;
    }
  }

  onFolderDelete(id: number): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${this.folder.title}` },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteFolder(id);
        })
      )
      .subscribe((result) => result);
  }

  onSelect() {
    this.selectFolder.emit();
  }
}
