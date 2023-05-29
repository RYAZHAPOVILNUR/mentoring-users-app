import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import { UsersCardComponent } from "../users-card/users-card.component";

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
  @Input({required: true})
  vm!: UsersListVM;
}
