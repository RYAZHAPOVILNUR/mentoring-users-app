import {
  ChangeDetectionStrategy, 
  Component, 
  DestroyRef, 
  EventEmitter, 
  inject, 
  Input, 
  Output, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialsVM } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsContentComponent } 
from '../../../../feature-materials-content/src/lib/materials-content/materials-content.component';


@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {

  @Input({ required: true })
  public material!: MaterialsVM;

  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Output() deleteMaterial = new EventEmitter();
  
  public onDeleteMaterial(material: MaterialsVM) {
    this.deleteMaterial.emit(material)
  } 

  public onOpenMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog
    .open(
      MaterialsContentComponent, { data: { material } }
    )
    dialogRef
    .afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe()
  }
  
}
