import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '@users/materials-data-access';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialStateService } from '../../../../services/material-state.service';

@Component({
  selector: 'users-folder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input({ required: true }) public folder!: Folder;
  private readonly _materialStateService: MaterialStateService = inject(MaterialStateService);

  public deleteFolder() {
    this._materialStateService.updateDeleteFolder({ id: this.folder.id, title: this.folder.title });
  }

  public openFolder() {
    this._materialStateService.updateOpenFolder(this.folder.id);
  }

  public getTitleTooltip(title: string): string {
    return title.length > 14 ? title : '';
  }
}
