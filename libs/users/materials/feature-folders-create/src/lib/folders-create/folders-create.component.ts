import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '../folders-add-button/folders-add-button.component';

@Component({
  selector: 'users-feature-folders-create',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent],
  templateUrl: './folders-create.component.html',
  styleUrls: ['./folders-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersCreateComponent { }
