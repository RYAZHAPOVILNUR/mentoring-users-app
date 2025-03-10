import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: 'users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit, OnDestroy{
  private subscription = new Subscription();
  @Output() filterUsers = new EventEmitter();
  name = new FormControl('');
  ngOnInit(){
    this.subscription = this.name.valueChanges.pipe( debounceTime(200) ).subscribe(value => { this.filterUsers.emit(value); })
    }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }
};




