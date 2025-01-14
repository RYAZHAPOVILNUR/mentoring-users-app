import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialsEntity} from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import {MaterialsFacade} from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import {
  MaterialsDeleteDialogComponent
} from '../materials-delete-dialog/materials-delete-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialsContentComponent } from '@materials/feature-materials-content';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) material$: MaterialsEntity | undefined;
  private readonly materialsFacade = inject(MaterialsFacade)
  private confirmDialog: MatDialog = inject(MatDialog)
  private contentDialog: MatDialog = inject(MatDialog)
   pdf: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  openConfirmDialog(id: number) {
    const dialogRef = this.confirmDialog.open(MaterialsDeleteDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialsFacade.deleteMaterial(id)
      }
    })
  }
  deleteMaterial(id: number | undefined, event: MouseEvent) {
    event.stopPropagation();
    if(id){this.openConfirmDialog(id)}
  }
  openContent(){
    this.contentDialog.open(MaterialsContentComponent, {data: {material: this.material$}});
  }
}
