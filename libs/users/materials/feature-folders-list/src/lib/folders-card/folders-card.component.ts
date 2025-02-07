import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FoldersVM } from 'libs/users/materials/folders-vm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Output() deleteUser = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  // @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  // onOpenMenu(event: Event) {
  //   event.stopPropagation();
  //   this.trigger.openMenu();
  // }

  // onDeleteUser(event: Event) {
  //   this.deleteUser.emit();
  // }

  // redirectToEditPage(editMode: boolean, event: Event) {
  //   const emitData = {
  //     id: this.user.id,
  //     editMode,
  //   };
  //   this.redirectToEdit.emit(emitData);
  // }
}
