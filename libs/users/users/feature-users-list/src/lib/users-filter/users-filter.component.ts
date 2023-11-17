import {
  ChangeDetectionStrategy,
  Component, inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCardComponent } from "../users-card/users-card.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {UsersFacade} from "@users/users/data-access";
import {UsersFilter} from "@users/core/data-access";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UsersCardComponent,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TranslateModule
  ]
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
  });
  filterUsers(){
    if(this.formGroup.valid) {
      const filter:UsersFilter = {
        name:  this.formGroup.value.name as string
      }
      this.usersFacade.filterUsers(filter);
      }
  }
}
