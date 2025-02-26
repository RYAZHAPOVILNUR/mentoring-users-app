import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
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
