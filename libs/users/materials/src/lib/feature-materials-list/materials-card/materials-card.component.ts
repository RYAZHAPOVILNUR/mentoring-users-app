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
import { typeMaterial } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsDeleteDialogComponent } from '../delete-dialog/delete-material-dialog.component';

@Component({
  selector: 'materials-card',
  templateUrl: 'materials-card.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule],
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: typeMaterial;

  @Output() selectMaterial = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  dialog = inject(MatDialog);

  onSelectMaterial(id: number) {
    this.selectMaterial.emit(id);
  }

  getDate(): string {
    let date = new Date(this.material.created_at);
    return `
		${String(date.getDate()).padStart(2, '0')}.
		${String(date.getDay() + 1).padStart(2, '0')}.
		${date.getFullYear()}`;
  }

  openDialogDeleteMaterial() {
    const dialogRef = this.dialog.open(MaterialsDeleteDialogComponent, {
      data: {
        material: this.material,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteMaterial.emit(result);
    });
  }
}
