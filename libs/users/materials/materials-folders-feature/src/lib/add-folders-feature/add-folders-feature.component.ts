import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-add-folders-feature',
  imports: [CommonModule, MatFormFieldModule, MatIcon, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './add-folders-feature.component.html',
  styleUrl: './add-folders-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFoldersFeatureComponent {
  private dialogRef = inject(MatDialogRef<AddFoldersFeatureComponent>);

  public folderName = '';

  create(){
    this.dialogRef.close(this.folderName)
  }

}
