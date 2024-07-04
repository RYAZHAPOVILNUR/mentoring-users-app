import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

type AddDialogRef = MatDialogRef<AddFolderDialogUiComponent, string>

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './add-folder-dialog-ui.component.html',
  styleUrls: ['./add-folder-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFolderDialogUiComponent {
  private readonly dialogRef: AddDialogRef = inject(MatDialogRef);

  onDoneButtonClick(title: string): void {
    this.dialogRef.close(title);
  }
}
