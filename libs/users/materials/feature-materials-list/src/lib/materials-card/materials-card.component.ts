import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialsVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { CorrectDatePipe, DefineMaterialTypePipe, ShortTitle } from '@users/feature-folders-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    DefineMaterialTypePipe,
    CorrectDatePipe,
    MatButtonModule,
    MatCardModule,
    ShortTitle,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({})
  material!: MaterialsVM;
  // private _vm: DetailFolderCardVm = {
  //   folder: null,
  //   status: 'init',
  //   errors: null,
  // };
  // public get vm() {
  //   return this._vm;
  // }
  // @Input({ required: true })
  // set vm(vm: DetailFolderCardVm) {
  //   this._vm = vm;
  //   if (vm.folder) {
  //   }
  // }
}
