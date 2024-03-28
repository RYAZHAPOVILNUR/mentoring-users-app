import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  @Input({ required: true }) dialogComponent!: any;
  @Output() afterClosed = new EventEmitter<any>();

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  openAddDialog(): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(this.dialogComponent, {
      data: { title: '' }
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(result => {
          console.log(result);
          result && this.afterClosed.emit(result);
        })
      )
      .subscribe();
  }
}
