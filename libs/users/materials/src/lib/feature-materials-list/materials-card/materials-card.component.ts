import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Material } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsDeleteDialogComponent } from '../delete-dialog/delete-material-dialog.component';
import { first, tap } from 'rxjs';
import { GetDatePipe } from '../../pipe-date-adapter/date-adapter.pipe';

@Component({
  selector: 'materials-card',
  templateUrl: 'materials-card.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule, GetDatePipe],
  providers: [ GetDatePipe ]
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: Material;

  @Output() selectMaterial = new EventEmitter<number>();
  @Output() deleteMaterial = new EventEmitter<number>();

  private dialog = inject(MatDialog);

  openDialogDeleteMaterial() {
    const dialogRef = this.dialog.open(MaterialsDeleteDialogComponent, {
      data: {
        material: this.material,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        tap((result: number) => {
          if (result) this.deleteMaterial.emit(result);
        })
      )
      .subscribe();
  }
}
