import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf, NgSwitchCase } from '@angular/common';
import { MaterialDTO } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MaterialType } from '../materials-list/materials-list-view-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({ 
  name: 'defineMaterialType', 
  standalone: true 
})
export class DefineMaterialTypePipe implements PipeTransform {
   transform(value: string): MaterialType {
     const isAudio = value.endsWith('.mp3');
     if (isAudio) return MaterialType.AUDIO;

     const isPdf = value.endsWith('.pdf');
     if (isPdf) return MaterialType.PDF;

    return MaterialType.VIDEO;
   }
}

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    NgIf,
    NgSwitchCase,
    DefineMaterialTypePipe,
],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {

    @Input({ required: true })
    material!: MaterialDTO;
    
    private readonly destroyRef = inject(DestroyRef);
    public dialog = inject(MatDialog);
    
    @Output() deleteMaterial = new EventEmitter();
    
    onDeleteMaterial(event: Event) {
      this.deleteMaterial.emit();
    }

    readonly materialTypes = MaterialType

    public onOpenMaterial(material: MaterialDTO): void {
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
