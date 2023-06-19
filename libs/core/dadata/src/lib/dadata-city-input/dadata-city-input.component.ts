import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  inject,
  Input, Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {DadataApiService} from "../dadata-api/dadata-api.service";
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, switchMap} from "rxjs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dadata-city-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './dadata-city-input.component.html',
  styleUrls: ['./dadata-city-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DadataCityInputComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  private dadata = inject(DadataApiService)
  public suggestions$!: Observable<string[]>

  ngAfterViewInit() {
    this.setupInputObservables();
  }

  private setupInputObservables() {
    const inputElement = this.inputField.nativeElement;
    this.suggestions$ = fromEvent<KeyboardEvent>(inputElement, 'input')
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.dadata.getCities(query))
      )
    this.suggestions$.subscribe(console.log)
  }
}
