import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '@users/materials-data-access';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialEventService } from '../../../../services/material-event-service';

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
  // @Output() public readonly deleteFolderEmit: EventEmitter<{ id: number; title: string }> = new EventEmitter<{
  //   id: number;
  //   title: string;
  // }>();
  @Output() public readonly openFolderEmit: EventEmitter<number> = new EventEmitter<number>();

  private materialEventService: MaterialEventService<{ id: number; title: string }> = inject(MaterialEventService);

  // public deleteFolder() {
  //   this.deleteFolderEmit.emit({ id: this.folder.id, title: this.folder.title });
  // }

  public deleteFolder() {
    this.materialEventService.updateAction({ id: this.folder.id, title: this.folder.title });
  }

  public openFolder() {
    this.openFolderEmit.emit(this.folder.id);
  }

  public getTitleTooltip(title: string): string {
    return title.length > 14 ? title : '';
  }
}
