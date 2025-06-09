import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'], 
  imports: [CommonModule, ReactiveFormsModule], 
  standalone: true, 
})
export class UsersFilterComponent {
  private readonly destroyRef = inject(DestroyRef); 

  @Output() changedInput = new EventEmitter<string>(); 
  nameControl = new FormControl<string>('', [Validators.required, Validators.minLength(2)]); 

  ngOnInit() {
    this.nameControl.valueChanges
      .pipe(
        tap((value) => {
          if (value !== null) {
            this.changedInput.emit(value)
          }
        }), 
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
  }
}

//valueChanges - слушает изменения формконтрол 