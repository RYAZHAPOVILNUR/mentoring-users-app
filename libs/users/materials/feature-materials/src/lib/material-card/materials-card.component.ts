import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RemoveFolderButtonComponent } from '@users/materials/ui';
import { Material } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatRippleModule, RemoveFolderButtonComponent, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: Material;

  public isDisplayRemoveButton = false;

  public toggleRemoveButton(): void {
    this.isDisplayRemoveButton = !this.isDisplayRemoveButton;
  }
}
