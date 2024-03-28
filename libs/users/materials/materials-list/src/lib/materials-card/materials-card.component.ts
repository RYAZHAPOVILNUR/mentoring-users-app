import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialDTO } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { LinkAnalyzerPipe } from '../../../../../core/pipes';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, LinkAnalyzerPipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) material!: MaterialDTO;

  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() revealMaterial = new EventEmitter<Pick<MaterialDTO, 'title' | 'material_link'>>();

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      width: '350px',
      data: { dialogText: 'Вы хотите безвозвратно удалить этот материал?' }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(result => result && this.deleteMaterial.emit(id))
    )
      .subscribe();
  }

  onRevealMaterial(): void {
    this.revealMaterial.emit({
      title: this.material.title,
      material_link: this.material.material_link.trim()
    });
  }
}
