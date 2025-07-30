import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PushPipe } from '@ngrx/component';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap } from 'rxjs';

import { AddressApiService } from '@shared/data-access-address';
import { Callback } from '@shared/util-typescript';

type ControlValue = string | null;
type InputValue = Extract<ControlValue, string>;

@Component({
  selector: 'users-input-city',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, PushPipe, MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input-city.component.html',
  styleUrls: ['./input-city.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCityComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCityComponent implements ControlValueAccessor, OnInit {
  private readonly addressApiService = inject(AddressApiService);

  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  private onChange?: Callback<InputValue>;
  private onTouched?: Callback;

  readonly value = signal<ControlValue>(null);

  citySuggestions$!: Observable<string[]>;

  ngOnInit(): void {
    this.citySuggestions$ = this.getCitySuggestionsChanges();
  }

  private getCitySuggestionsChanges(): Observable<string[]> {
    return fromEvent<InputEvent>(this.inputElement().nativeElement, 'input').pipe(
      map((event) => (event.target as HTMLInputElement)?.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => (value ? this.addressApiService.getCities(value) : of([]))),
    );
  }

  onInputValueChange(city: InputValue): void {
    this.onChange?.(city);
  }

  onSuggestionClick(city: InputValue): void {
    this.onChange?.(city);
  }

  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: typeof this.onTouched): void {
    this.onTouched = fn;
  }

  writeValue(value: ControlValue): void {
    this.value.set(value);
  }
}
