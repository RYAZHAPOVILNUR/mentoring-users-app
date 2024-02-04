import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LetDirective, PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsListContainerStore } from './materials-list.component.store';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { CreateMaterial, Material } from '../../../../data-access/src/lib/models/material.models';
import {
  MaterialsAddButtonComponent
} from '../../../../feature-materials-create/src/lib/materials-add-button/materials-add-button.component';
import {
  MaterialsAddDialogComponent
} from '../../../../feature-materials-create/src/lib/materials-add-dialog/materials-add-dialog.component';
import { MaterialsContentComponent } from '@users/feature-materials-content';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, LetDirective, PushPipe, MatIconModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore]
})

export class MaterialsListContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly openedFolder$ = this.componentStore.openedFolder$;
  private readonly materialTitle!: string;
  private readonly materialLink!: string;

  ngOnInit() {
    this.componentStore.loadMaterials();
  }

  goBackToFolders() {
    this.router.navigate(['/materials']);
  }

  onAddMaterial(materialType: string) {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog
      .open(MaterialsAddDialogComponent, {
        data: {
          materialType: materialType,
          materialTitle: this.materialTitle,
          materialLink: this.materialLink
        }
      });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newMaterial: CreateMaterial = {
            title: result.materialTitle,
            material_link: result.materialLink
          };
          this.componentStore.addMaterial(newMaterial);
        }
      });
  }

  openMaterial(material: Material) {
    this.dialog.open(MaterialsContentComponent, {
      data: {
        materialTitle: material.title,
        materialLink: material.material_link
      }
    });
  }

  deleteMaterial(material: Material) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` }
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.componentStore.deleteMaterial(material.id);
        }
      });

  }
}
