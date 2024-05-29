import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade, TMaterialCreate} from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeatureMaterialsCreateComponent } from '../feature-materials-create/feature-materials-create.component';
import { MatMenuModule } from '@angular/material/menu';
import { TMaterialButton, MaterialFormat } from './materials-buttons.interface';

const ValidationPatterns = {
  [MaterialFormat.VIDEO]: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
  [MaterialFormat.PDF]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
  [MaterialFormat.PODCAST]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
};

@Component({
  selector: 'users-materials-create-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './materials-create-button.component.html',
  styleUrls: ['./materials-create-button.component.scss'],
})
export class MaterialsCreateButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  public readonly buttons: TMaterialButton[] = [
    { title: 'Видео', icon: 'movie', value: MaterialFormat.VIDEO },
    { title: 'PDF', icon: 'description', value: MaterialFormat.PDF },
    { title: 'Подкаст', icon: 'music_note', value: MaterialFormat.PODCAST },
  ]

  public openMaterialDialog(materialButton: TMaterialButton): void {
    const dialogRef: MatDialogRef<FeatureMaterialsCreateComponent> = this.dialog.open(FeatureMaterialsCreateComponent, {
      data: { materialTitle: materialButton.title, validation: ValidationPatterns[materialButton.value] },
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: TMaterialCreate) => {
        if (result) {
          this.materialsFacade.createMaterial({ title: result.title, material_link: result.material_link });
        }
      });
  }
}
