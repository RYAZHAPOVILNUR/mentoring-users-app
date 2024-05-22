import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from './materials-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MaterialsCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Output() public readonly closeFolderEvent = new EventEmitter();
  @Input({required: true}) public vm!: MaterialsVM;
 

  public closeFolder() {
    this.closeFolderEvent.emit();
  }
}
