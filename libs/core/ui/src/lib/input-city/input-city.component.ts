import { Observable, Subject, fromEvent, map } from 'rxjs';
import { of } from 'rxjs';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, Self, Input, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { NgControl, ReactiveFormsModule, FormControl, ControlValueAccessor, Validators } from '@angular/forms';
import { tap,distinctUntilChanged, debounceTime, switchMap, filter} from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DadataApiService } from '@dadata';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { ProfileFormVm } from '@users/users/profile/feature-profile';

@Component({
  selector: 'users-input-city',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    PushPipe
  ],
  templateUrl: './input-city.component.html',
  styleUrls: ['./input-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCityComponent implements ControlValueAccessor, OnInit{
  private dadataService = inject(DadataApiService);
  private destroyRef = inject(DestroyRef);
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  value$?:Observable<string>;
  private inputElement?:any;
  public citySuggestions?:string[];
  // private inputObs$ = fromEvent<Event>(this.inputElement, 'input').pipe(
  //   map((event: Event) => (event.target as HTMLInputElement).value),
  //   debounceTime(300),
  // );

  @Input({ required: true }) vm!: ProfileFormVm;

  ngOnInit(): void {
    this.inputElement = this.elementRef.nativeElement.querySelector("#inputElement");
  }

  constructor(
    @Self() private readonly ngControl: NgControl,
    private readonly changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
    )
  {
      this.ngControl.valueAccessor = this;
  }

  public onInputValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const city = targetInputElement.value;
    // this.inputObs$.subscribe((text)=>{
    //   console.log(text);
    // })
    // this.onChange(city);
    // this.inputValueSubject.next(city);
  }
  
  testClick():void{
    console.log(this.citySuggestions);
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  // ASK - ЧЕ ОН ДЕЛАЕТ. кто занимается перерисовкой компанента this.onChange()??
  writeValue(value: string): void {
      this.changeDetector.detectChanges();
  }
}
