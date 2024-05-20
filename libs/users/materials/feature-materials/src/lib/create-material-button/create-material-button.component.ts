import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MaterialsCreateDialogComponent } from '../materials-create-dialog/materials-create-dialog.component';

import { Button } from './button.interface';
import { MaterialButtonTypes } from './material-button.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsFacade } from '@users/materials/data-access';

const ValidationPatterns = {
  [MaterialButtonTypes.VIDEO]: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
  [MaterialButtonTypes.PDF]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
  [MaterialButtonTypes.PODCAST]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
};

@Component({
  selector: 'create-material-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-material-button.component.html',
  styleUrls: ['./create-material-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialButtonComponent {
  public readonly buttons: Button[] = [
    { icon: 'videocam', value: MaterialButtonTypes.VIDEO },
    { icon: 'podcasts', value: MaterialButtonTypes.PODCAST },
    { icon: 'picture_as_pdf', value: MaterialButtonTypes.PDF },
  ];
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialTitle!: string;
  private readonly materialLink!: string;
  public readonly materialType = {
    video: MaterialButtonTypes.VIDEO,
    pdf: MaterialButtonTypes.PDF,
    podcast: MaterialButtonTypes.PODCAST,
  };
  public readonly dialog = inject(MatDialog);
  public isButtonsVisible = false;

  public onToggleFab(): void {
    this.isButtonsVisible = !this.isButtonsVisible;
  }

  public onClickHandler(materialType: MaterialButtonTypes): void {
    const dialogRef: MatDialogRef<MaterialsCreateDialogComponent> = this.dialog.open(MaterialsCreateDialogComponent, {
      data: {
        materialType: materialType,
        validatationPattern: ValidationPatterns[materialType],
        materialTitle: this.materialTitle,
        materialLink: this.materialLink,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newMaterial) => {
        if (newMaterial) this.materialsFacade.create(newMaterial);
      });
  }
}
