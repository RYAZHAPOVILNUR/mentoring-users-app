import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMaterialListComponent } from "../user-material-list/user-material-lsit.component";
import { UserMaterialsFacade } from '@users/user-material-data-access';
import { MaterialsVM } from '../user-material-card/materials.vm';
import { MaterialListContainerStore } from './user-material.store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { filter, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserMaterialsContentComponent } from '@users/users/materials/user-materials-content';
import { MaterialEntity } from '@users/core/data-access';

@Component({
  selector: 'user-materials-list-container',
  standalone: true,
  imports: [CommonModule, UserMaterialListComponent, MatButtonModule,
            MatDialogModule,
            LetDirective,],
  templateUrl: './user-material-list-container.component.html',
  styleUrls: ['./user-material-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialListContainerComponent {
  private readonly componentStore = inject(MaterialListContainerStore);
  public materialsFacade = inject(UserMaterialsFacade);
  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  @Input({required: true})
  folder_id?: number;

  public readonly filteredMaterials$ = this.materials$.pipe(
    map((materials) => materials.filter((material) => material.folder_id === this.folder_id))
  )

  public onDeleteMaterial(material: MaterialsVM) {
    this.componentStore.deleteMaterial(material);
  }

  public onOpenMaterial(material: MaterialsVM) {
    const isAudio = material.material_link?.endsWith('.mp3');
    const isPdf = material.material_link?.endsWith('.pdf');
  
    const dialogWidth = isAudio ? '400px' : '80vw';
    const dialogHeight = isAudio ? '150px' : isPdf ? '90vh' : '80vh';
  
    const dialogRef: MatDialogRef<UserMaterialsContentComponent> = this.dialog.open(
      UserMaterialsContentComponent, {
        data: { material },
        width: dialogWidth,
        height: dialogHeight,
        maxWidth: 'none',
        panelClass: isAudio ? 'audio-dialog' : isPdf ? 'pdf-dialog' : 'materials-content'
      }
    );
  
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }  
  
}
