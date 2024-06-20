import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Folder, MaterialsState } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-card-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './folders-card-ui.component.html',
  styleUrls: ['./folders-card-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardUiComponent {
  @Input({ required: true }) folder!: Folder;
  private readonly materialsState = inject(MaterialsState);

  onCardClick(): void {
    this.materialsState.openFolder(this.folder.id, this.folder.title);
  }

  onDeleteButtonClick(): void {
    this.materialsState.deleteFolder(this.folder.id);
  }
}
