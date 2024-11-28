import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
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
export class UsersFilterComponent {
  public filterGroup = new FormGroup({
    name: new FormControl(''),
  });

  @Output() filterChanged = new EventEmitter();

  public onFilterChanged(): void {
    const filterValue = this.filterGroup.value.name;
    this.filterChanged.emit(filterValue);
  }
}
