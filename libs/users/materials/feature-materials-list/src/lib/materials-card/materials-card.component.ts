import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MaterialsDeleteComponent } from '../materials-delete/materials-delete.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { timer } from 'rxjs';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  dialog = inject(MatDialog)
  facade = inject(MaterialsFacade)
  emoji: any = {
    "f": "insert_drive_file",
    "3": "audiotrack",
  }
  @Input() material!: any
  open: boolean = false

  openMaterial(material: any) {
    if (!this.open) {
      this.open = true
      timer(400).subscribe(_ => this.open = false)
      return
    }

    this.dialog.open(MaterialsContentComponent, {
      maxWidth: '1000px',
      maxHeight: '1000px',
      panelClass: "aaa",
      data: {
        src: material.material_link,
        title: material.title
      }
    })

    // doalogRef.afterClosed()
    //   .subscribe(v => console.log(v))
  }

  del(material: any, event: Event) {
    event.stopPropagation()

    const dialogRef = this.dialog.open(MaterialsDeleteComponent, {
      data: {
        material
      }
    })

    dialogRef.afterClosed()
      .subscribe(v => v && this.facade.deleteFile(material))
  }
}
