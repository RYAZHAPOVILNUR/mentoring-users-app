import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IMaterial, MaterialsFacade, MaterialType } from '@users/materials/data-access';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';
import { MaterialContentComponent } from '../material-content/material-content.component';
import { MaterialDeleteDialogComponent } from '../material-delete-dialog/material-delete-dialog.component';

@Component({
  selector: 'users-material-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './material-viewer.component.html',
  styleUrls: ['./material-viewer.component.scss']
})
export class MaterialViewerComponent {
  private readonly dialog = inject(MatDialog);
  public readonly materialsFacade = inject(MaterialsFacade);
  readonly MaterialType = MaterialType;

  onOpenMaterial(material: IMaterial): void {
    this.dialog.open(MaterialContentComponent, {
      width: '900px',
      data: { material }
    });
  }

  onAddMaterial(type: MaterialType): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '500px',
      data: { type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialsFacade.addMaterial(result);
      }
    });
  }

  onDeleteMaterial(materialId: string): void {
    const dialogRef = this.dialog.open(MaterialDeleteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialsFacade.deleteMaterial(materialId);
      }
    });
  }

  getIconForLink(link: string): string {
    const cleanLink = link.split('?')[0].toLowerCase();
    
    if (cleanLink.endsWith('.pdf')) {
      return 'picture_as_pdf';
    } else if (cleanLink.endsWith('.mp3') || link.includes('soundcloud.com')) {
      return 'audiotrack';
    } else {
      return 'video_library';
    }
  }

  dateFormat(date: string): string {
    return new Date(date).toLocaleDateString();
  }
} 