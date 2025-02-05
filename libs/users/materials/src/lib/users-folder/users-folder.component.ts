import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'users-folder',
  standalone: true,
  imports: [],
  templateUrl: './users-folder.component.html',
  styleUrls: ['./users-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFolderComponent {}
