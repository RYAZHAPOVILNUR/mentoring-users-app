import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'users-filter',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
  })

  export class UsersFilterComponent implements OnInit {
    form = new FormGroup({nameValue: new FormControl('')});
    ngOnInit(): void {
      console.log(this.form.value)
    }

    onHandle(){
      console.log(this.form.value)
     
    }
  }
  