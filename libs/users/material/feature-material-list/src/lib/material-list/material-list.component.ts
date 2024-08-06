import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialCardComponent } from '../material-card/material-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialListVM } from './material-view-model';
import { Material } from '@users/material';

@Component({
  selector: 'users-material-list',
  standalone: true,
  imports: [CommonModule, MaterialCardComponent, MatIconModule, MatProgressBarModule],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListComponent {
  @Input() mvm!: MaterialListVM;
  @Output() toFolderList = new EventEmitter();
  @Output() openMaterial = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onToFolderList(): void {
    this.toFolderList.emit();
  }

  public onOpenMaterial(matearial: Material): void {
    this.openMaterial.emit(matearial);
  }

  public onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id);
  }
}
