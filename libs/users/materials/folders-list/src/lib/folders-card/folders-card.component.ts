import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

export const getFormattedDate = (timestamp: string): string => {
  const date = new Date(Number(timestamp));
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('ru', options);
}

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent implements OnInit{
  private readonly dialog = inject(MatDialog);
  public parsedDate?: string;

  @Input({ required: true }) folder!: FolderDTO;

  @Output() deleteFolder = new EventEmitter<number>();
  @Output() revealFolder = new EventEmitter<number>();

  ngOnInit(): void {
    this.parsedDate = getFormattedDate(this.folder.created_at)
  }

  onRevealFolder(id: number): void {
    this.revealFolder.emit(id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      width: '350px',
      data: { dialogText: 'Вы хотите безвозвратно удалить эту папку?'}
    });

    dialogRef.afterClosed().subscribe(result =>
      result && this.deleteFolder.emit(id))
  }
}
