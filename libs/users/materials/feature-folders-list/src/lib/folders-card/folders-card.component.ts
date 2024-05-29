import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TFolderDTO } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  private readonly router = inject(Router);
  private _isDisplayItem = false;

  @Input({ required: true })
  public folder!: TFolderDTO;
  @Output() deleteFolder = new EventEmitter<TFolderDTO>();

  get isDisplayItem() {
    return this._isDisplayItem;
  }

  public toggleDisplayItem(): void {
    this._isDisplayItem = !this._isDisplayItem
  }

  public onOpenMaterialsFolder() {
    this.router.navigate([`/materials/${this.folder.id}`], { state: { folderTitle: this.folder.title } });
  }
}
