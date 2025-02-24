import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersEntity } from '../../../../../../core/data-access/src/lib/folders.entity';
import { MatIconModule } from '@angular/material/icon';
import { FoldersDTO } from '../../../../../../core/data-access/src';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input() folder!: FoldersDTO;
}
