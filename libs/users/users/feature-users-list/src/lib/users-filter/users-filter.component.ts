import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
@Component({
    selector: 'users-filter',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
  })

  export class UsersFilterComponent implements OnInit {
    form = new FormGroup({nameValue: new FormControl('')});

    private readonly usersFasade = inject(UsersFacade);
    ngOnInit(): void {
      this.form.valueChanges.subscribe(value => {
        const filteredValue = (value.nameValue ?? '').replace(/\s/g, ''); 
  
        if (value.nameValue !== filteredValue) {
          this.form.get('nameValue')?.setValue(filteredValue, { emitEvent: false });
        }
        this.usersFasade.filterUser(filteredValue);
      });
    }

  }
  