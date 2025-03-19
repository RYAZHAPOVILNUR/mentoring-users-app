import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { SharedFacade } from '../../../../data-access/src/lib/+state/sharedFacade';
import { CreateMaterialsDTO } from '../../../../data-access/src/lib/models/materials-dto.model';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

interface CreateMaterialFormValue {
  folderId: number;
  name: string;
  link: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-add-button',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsAddButtonComponent {
  private readonly folderId?: number
  private readonly dialog = inject(MatDialog);
  private readonly facade = inject(SharedFacade);
  private readonly destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute) {
    const rawFolderId = this.route.snapshot.paramMap.get('folderId');
    this.folderId = rawFolderId ? +rawFolderId : undefined;
  }

  private openAddDialog(title: string) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { title }
    })

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
     .subscribe((result) => {
        if(result && this.folderId) {
          const formValue: CreateMaterialFormValue = {
            folderId: this.folderId,
            name: result.name,
            link: result.link,
          };
          const newMaterialData = this.formValueToCreateMaterialsDTO(formValue);

          this.facade.addMaterial(newMaterialData)
        }
      });
  }

  public addPdf(){
    this.openAddDialog('Добавить PDF');
  }

  public addAudio(){
    this.openAddDialog('Добавить аудио');
  }

  public addVideo(){
    this.openAddDialog('Добавить видео');
  }

   formValueToCreateMaterialsDTO(
    formValue: CreateMaterialFormValue
  ): CreateMaterialsDTO {
    return {
      title: formValue.name,
      material_link: formValue.link,
      folder_id: formValue.folderId,
    };
  }

}
