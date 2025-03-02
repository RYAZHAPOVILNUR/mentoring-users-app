import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatButtonModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  dialog = inject(MatDialog)
  facade = inject(MaterialsFacade)
  route = inject(ActivatedRoute)

  onOpen(title: string) {
    const id = this.route.snapshot.paramMap.get('id')
    
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: {
        title,
        type: title === 'PDF' ? ['.pdf'] : title === 'Музыки' ? ['.mp3'] : ['']
      }
    })
    dialogRef.afterClosed()
      .subscribe((file) => file && this.facade.loadFile({...file, folder_id: id}))
  }
}
