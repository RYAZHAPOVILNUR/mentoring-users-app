import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardUiComponent } from '@users/materials/feature-folders-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardUiComponent } from '../materials-card-ui/materials-card-ui.component';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardUiComponent, MatProgressBarModule, MaterialsCardUiComponent],
  templateUrl: './materials-list-ui.component.html',
  styleUrls: ['./materials-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListUiComponent {
  @Input({ required: true }) materials!: Material[];
  @Input({ required: true }) status!: string;

  // todo В КАКИХ СЛУЧАЯХ СТАВИМ "_" И ГДЕ? // для ПРИВАТНЫХ переменных название которых пересекается с текущими, например:
  private _users: any;
  get users() {
    return this._users;
  }

  set users(users: any) {
    this._users = users;
  }
}







