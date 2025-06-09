import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'users-users-filter',
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UsersFilterComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  @Output() public userInput = new EventEmitter<string>();
  protected readonly filter = new FormControl<string>('', { nonNullable: true });

  ngOnInit() {
    this.filter.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
    ).subscribe((input)=>this.userInput.emit(input))
  }
}
