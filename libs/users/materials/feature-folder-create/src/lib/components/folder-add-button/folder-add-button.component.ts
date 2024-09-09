import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateFolderDialogService } from '../../services/create-folder-dialog.service';

@Component({
  standalone: true,
  selector: 'users-folder-add-button',
  templateUrl: './folder-add-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
  providers: [CreateFolderDialogService],
})
export class FolderAddButtonComponent {
  private readonly createFolderDialogService: CreateFolderDialogService =
    inject(CreateFolderDialogService);

  public showFolderCreateDialog() {
    this.createFolderDialogService.showFolderCreateDialog().subscribe();
  }
}
