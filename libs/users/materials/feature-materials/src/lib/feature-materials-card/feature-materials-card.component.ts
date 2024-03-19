import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialContentComponent } from '../material-content/material-content.component';
import { MaterialEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';

@Component({
  selector: 'users-feature-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './feature-materials-card.component.html',
  styleUrls: ['./feature-materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsCardComponent {
  @Input({required:true})
  material!: MaterialEntity;


  @Output() deleteMaterial = new EventEmitter();


  private readonly destroyRef = inject(DestroyRef);
  public matDialog = inject(MatDialog);


  public onOpenMaterial(material: MaterialEntity){
    const dialogRef: MatDialogRef<MaterialContentComponent> = this.matDialog.open(
      MaterialContentComponent, { data: { material } })

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
  
  public dateFormat(time: number): string {
    const date = new Date(time);
    return `
      ${date.getDate()} 
      ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    `
  }

  public onDeleteMaterial(material:MaterialEntity){
    this.deleteMaterial.emit(material)
  }

}
