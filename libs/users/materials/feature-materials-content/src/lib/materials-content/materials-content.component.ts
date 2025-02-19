import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgSwitchCase } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialsVM } from '../../../../materials-vm';
import { SafeUrlPipe, YoutubeEmbedPipe } from '@users/core/utils';
import { FileFormat } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SafeUrlPipe,
    YoutubeEmbedPipe,
    NgSwitchCase,
    MatDialogModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  private readonly data: {
    dialogText: string;
    materialById$: MaterialsVM;
    materialFormat: FileFormat;
  } = inject(MAT_DIALOG_DATA);

  public readonly materialById$: MaterialsVM = this.data.materialById$;
  public readonly materialFormat: string = this.data.materialFormat;
}
