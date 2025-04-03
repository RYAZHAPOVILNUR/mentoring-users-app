import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-add-material-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './add-material-button.component.html',
  styleUrls: ['./add-material-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);

  @Input()
  openedFolder!: any;

  onAddFile(type: string): void {
    switch (type) {
      case 'pdf':
        this.onOpenDialog('pdf');
        break;
      case 'audio':
        this.onOpenDialog('audio');
        break;
      case 'video':
      default:
        this.onOpenDialog('video');
        break;
    }
  }

  onOpenDialog(title: string): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      data: { title: title, folder: this.openedFolder },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.materialsFacade.addMaterial(result);
    });
  }
}
