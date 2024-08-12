import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from "../folders-card/folders-card.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FoldersListVM } from './folders-list-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Folder } from '@users/materials/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true})
  vm!: FoldersListVM

  private snackBar = inject(MatSnackBar);
  @ViewChild('snackbarDeleteFolderSuccess') snackbarTemplateRef!: TemplateRef<any>;

  @Output() deleteFolder = new EventEmitter()
  @Output() redirectToMaterialsPage = new EventEmitter()

  onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit({folder: folder, showSnackbarDeleteFolderSuccess: this.showSnackbarDeleteFolderSuccess})
  }

  private showSnackbarDeleteFolderSuccess = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    onRedirectToMaterialsPage(id: number) {
      this.redirectToMaterialsPage.emit(id)
    }
}

