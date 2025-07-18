import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  Self,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PushPipe } from '@ngrx/component';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, switchMap } from 'rxjs';

import { AddressApiService } from '@shared/data-access-address';
import { UserEntity } from '@users/core/data-access-models';

@Component({
  selector: 'users-input-city',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, PushPipe],
  templateUrl: './input-city.component.html',
  styleUrls: ['./input-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCityComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) vm!: UserEntity;
  private addressApiService = inject(AddressApiService);
  private destroyRef = inject(DestroyRef);
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private inputElement!: HTMLInputElement;

  value?: string;
  public citySuggestions$!: Observable<string[]>;

  constructor(
    @Self() private readonly ngControl: NgControl,
    private readonly changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    this.value = this.vm.city;
    this.inputElement = this.elementRef.nativeElement.querySelector('#inputElement');
    this.citySuggestions$ = fromEvent<Event>(this.inputElement, 'input').pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged(),
      filter(Boolean),
      switchMap((value) => this.addressApiService.getCities(value)),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  public onInputValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const city = targetInputElement.value;
    this.onChange(city);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onClickSuggestion(suggestion: string) {
    this.onChange(suggestion);
  }

  writeValue(value: string): void {
    this.value = value;
    this.changeDetector.detectChanges();
  }
}
