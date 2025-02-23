import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatTooltipModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Output()
  backFolders = new EventEmitter()
  @Output()
  addMaterial = new EventEmitter()

  onBack(): void {
    this.backFolders.emit()
  }

  onAddMaterial(format: string) {
    this.addMaterial.emit(format)
  }
}
