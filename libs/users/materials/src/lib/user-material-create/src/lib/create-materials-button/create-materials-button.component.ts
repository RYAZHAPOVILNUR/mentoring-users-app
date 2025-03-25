import { ChangeDetectionStrategy, Component, inject, DestroyRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserMaterialsFacade } from '@users/user-material-data-access';
import { CreateMaterialDialogComponent} from '../create-materials-dialog/create-material-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { CreateMaterialDTO, TypeMaterial } from '@users/core/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly materialsFacade = inject(UserMaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  private materialTitle!: string;
  private materialLink!: string;

  @Input()
  folder_id?: number;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  public onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onAddMaterial(materialType: string): void {
    const dialogRef: MatDialogRef<CreateMaterialDialogComponent> = this.dialog
      .open(CreateMaterialDialogComponent, { data: {
        materialType: materialType,
        materialTitle: this.materialTitle, materialLink: this.materialLink
      } });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const newMaterial: CreateMaterialDTO = {
            title: result.materialTitle,
            material_link: result.materialLink,
            typeMaterial:
              result.materialType === "Video" ? TypeMaterial.Video
              : result.materialType === "Audio" ? TypeMaterial.Audio
              : result.materialType === "PDF" ? TypeMaterial.PDF
              : undefined,
            created_at: new Date().toISOString(),
            folder_id: this.folder_id,
          }

          this.materialsFacade.addMaterial(newMaterial)
        }
      })
  }
}