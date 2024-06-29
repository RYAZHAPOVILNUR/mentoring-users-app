import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialsEntity } from '@users/users/materials/data-access';

@Component({
  selector: 'users-pdf-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf-content.component.html',
  styleUrls: ['./pdf-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfContentComponent {
  @Input({required: true})
  material!: MaterialsEntity;
}
