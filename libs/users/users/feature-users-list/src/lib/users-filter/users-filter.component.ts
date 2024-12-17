import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit {
  public filterGroup = new FormGroup({
    name: new FormControl(''),
  });

  @Output() filterChanged = new EventEmitter();

  ngOnInit(): void {
    this.filterGroup.get('name')?.valueChanges.subscribe((value) => this.filterChanged.emit(value));
  }
}
