import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {  IMaterial } from '@users/materials/data-access';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { BasketDirective } from './directives-folders/basket.directive';
import { HighlightOnClickDirective } from './directives-folders/highlight-on-click.directive.ts';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    BasketDirective,
    HighlightOnClickDirective,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);

  @Input({ required: true })
  material!: IMaterial;

  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: IMaterial): void {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: IMaterial): void {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {
      data: { material },
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
