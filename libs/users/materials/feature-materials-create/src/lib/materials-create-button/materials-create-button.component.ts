import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsCreateDialogComponent } from '../materials-create-dialog/materials-create-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum MaterialsType {
  video = 'Video',
  pdf = 'pdf',
  podcast = 'podcast',
}

const ValidatationPatterns = {
  [MaterialsType.video]: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
  [MaterialsType.pdf]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
  [MaterialsType.podcast]: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
};

@Component({
  selector: 'users-materials-create-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './materials-create-button.component.html',
  styleUrls: ['./materials-create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCreateButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);

  private readonly materialTitle!: string;
  private readonly materialLink!: string;
  public readonly materialType = {
    video: MaterialsType.video,
    pdf: MaterialsType.pdf,
    podcast: MaterialsType.podcast,
  };

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  public onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onAddMaterial(materialType: MaterialsType): void {
    const dialogRef: MatDialogRef<MaterialsCreateDialogComponent> = this.dialog.open(MaterialsCreateDialogComponent, {
      data: {
        materialType: materialType,
        validatationPattern: ValidatationPatterns[materialType],
        materialTitle: this.materialTitle,
        materialLink: this.materialLink,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newMaterial) => {
        console.log('newMaterial', newMaterial);

        if (newMaterial) {
          this.materialsFacade.create(newMaterial);
        }
      });
  }
}
