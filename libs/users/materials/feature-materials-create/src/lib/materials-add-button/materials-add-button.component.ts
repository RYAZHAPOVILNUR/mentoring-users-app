import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IMaterialCreate,
  MaterialType,
  MaterialsFacade,
} from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dilog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialsAddService } from '../materials-add-service';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MaterialsAddDialogComponent,
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);
  private materialsAddService = inject(MaterialsAddService);
  public pdf: MaterialType;
  public video: MaterialType;
  public audio: MaterialType;
  public addDialogTitle!: string;

  constructor() {
    this.pdf = MaterialType.Pdf;
    this.audio = MaterialType.Audio;
    this.video = MaterialType.Video;
  }

  addFile(fileType: MaterialType) {
    this.addDialogTitle = `Добавить ${fileType}`;
    this.materialsAddService.updateDialogTitle(this.addDialogTitle);
    this.onOpenDialog();
  }

  onOpenDialog() {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: {},
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const dataMaterial: IMaterialCreate = {
            title: result.title,
            material_link: result.link,
            folder_id: result.id,
          };
          if (this.addDialogTitle === `Добавить ${this.pdf}`) {
            this.materialsFacade.addMaterialPDF(dataMaterial);
          } else {
            this.materialsFacade.addMaterial(dataMaterial);
          }
        }
      });
  }
}
