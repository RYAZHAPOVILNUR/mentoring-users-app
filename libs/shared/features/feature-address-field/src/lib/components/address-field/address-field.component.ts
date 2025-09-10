import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { PushPipe } from '@ngrx/component';
import { TranslatePipe } from '@ngx-translate/core';
import { Address, AddressService, AddressType } from '@shared/data-access-address';
import { Callback } from '@shared/util-typescript';
import { fromEvent, map, Observable } from 'rxjs';

import { ADDRESS_FIELD_LABELS } from '../../constants/address-field-labels.constant';

type ControlValue = string | null;
type InputValue = Extract<ControlValue, string>;

@Component({
  selector: 'users-address-field',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    PushPipe,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltip,
    TranslatePipe,
  ],
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFieldComponent implements ControlValueAccessor, OnInit {
  private readonly addressService = inject(AddressService);

  private readonly addressInput = viewChild.required<ElementRef<HTMLInputElement>>('addressInput');

  private onChange?: Callback<InputValue>;
  private onTouched?: Callback;

  readonly type = input.required<AddressType>();

  readonly placeholder = input('Введите адреc');
  readonly appearance = input<MatFormFieldAppearance>('fill');

  readonly value = signal<ControlValue>(null);
  readonly isDisabled = signal(true);

  readonly isLabelInside = computed(() => this.appearance() === 'fill');

  readonly labels = ADDRESS_FIELD_LABELS;

  addressValues$!: Observable<Array<Address['value']>>;

  ngOnInit(): void {
    this.addressValues$ = this.getAddressValuesByQueryChanges(this.type());
  }

  onValueInput(city: InputValue): void {
    this.onChange?.(city);
    this.value.set(city);
  }

  onValueClick(city: InputValue): void {
    this.onChange?.(city);
    this.value.set(city);
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

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  private getAddressValuesByQueryChanges(type: AddressType): Observable<Array<Address['value']>> {
    const queryInput = this.addressInput().nativeElement;

    const query$ = fromEvent<InputEvent>(queryInput, 'input').pipe(
      map(({ target }) => (target as HTMLInputElement).value),
    );

    return this.addressService
      .getAddressesByQuery(query$, type)
      .pipe(map((addresses) => addresses.map(({ value }) => value)));
  }
}
