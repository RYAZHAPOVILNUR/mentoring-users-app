import {Component, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {setUsersFilter, UsersFacade} from "@users/users/data-access";
import {UsersCardComponent} from "../src/lib/users-card/users-card.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
  });

  filterUsers(){
    if(this.formGroup.valid) {
      const filter: {name: string} = {
        name:  this.formGroup.value.name as string
      }
      this.usersFacade.filterUsers(filter);
    }
  }
  }
