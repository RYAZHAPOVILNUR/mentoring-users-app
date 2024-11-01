import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FoldersVM } from '@users/materials';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule, MatButtonModule, MatCardModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent implements OnInit {
  public isFolderEmpty = true;
  public materialsFacade = inject(MaterialsFacade);
  public foldersFacade = inject(FoldersFacade);
  private destroyRef = inject(DestroyRef);
  public folderIcon: string = 'folder_open';

  @Input({ required: true }) folder!: FoldersVM;
  @Output() deleteFolder = new EventEmitter<number>();
  @Output() openFolder = new EventEmitter<number>();

  ngOnInit(): void {
    this.updateFolderIconStatus();
    this.checkIfFolderIsEmpty();
  }

  private checkIfFolderIsEmpty(): void {
    this.materialsFacade.getMaterialsByFolder(this.folder.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(materials => {
        this.isFolderEmpty = materials.length === 0;
        this.folderIcon = this.isFolderEmpty ? 'folder_open' : 'folder';
      });
  }

  private updateFolderIconStatus(): void {
    this.materialsFacade.getMaterialsByFolder(this.folder.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(materials => {
        this.folderIcon = materials.length === 0 ? 'folder' : 'folder_open';
      });
  }

  public onFolderDelete(folder: FoldersVM): void {
    this.deleteFolder.emit(folder.id);
  }

  public onFolderOpen(id: number): void {
    this.openFolder.emit(id);
  }
}
