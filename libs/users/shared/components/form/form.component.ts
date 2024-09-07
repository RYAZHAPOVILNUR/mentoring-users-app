import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

export interface FormField {
  key: string;
  value: unknown;
  label: string;
  placeholder: string;
  validators: ValidatorFn | ValidatorFn[] | null;
}

export interface FormValue {
  [key: string]: any;
}

@Component({
  standalone: true,
  selector: 'users-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class FormComponent<T> implements OnInit {
  @Input() public form: FormGroup = new FormGroup({});
  @Input() public formFields: FormField[] = [];
  @Input() public key: string = '';
  public formGroup!: FormGroup;

  public ngOnInit(): void {
    const form = this.buildForm();
    this.form.addControl(this.key, form);
    this.formGroup = this.form.get(this.key) as FormGroup;
  }

  private buildForm(): FormGroup {
    const formConfig: { [key in keyof T]: FormControl } = {} as {
      [K in keyof T]: FormControl;
    };

    this.formFields.forEach((field) => {
      formConfig[field.key as keyof T] = new FormControl(
        field.value,
        field.validators
      );
    });
    return new FormGroup(formConfig);
  }
}
