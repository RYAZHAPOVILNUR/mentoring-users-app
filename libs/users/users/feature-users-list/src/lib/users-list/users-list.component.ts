import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import {CardChanges, UsersCardComponent} from "../users-card/users-card.component";

@Component({
    selector: 'users-list-ui',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        UsersCardComponent
    ]
})
export class UsersListComponent {
  @Input({required: true}) vm!: UsersListVM;
  @Output() itemChanged = new EventEmitter<CardChanges>()

  public cardChangesHandler({userId, mod}: CardChanges) {
    if (mod === "delete") {
      this.itemChanged.emit({userId, mod: "delete"})
    }
    // if (mod === "edit") {
    //   ...
    // }
  }
}
