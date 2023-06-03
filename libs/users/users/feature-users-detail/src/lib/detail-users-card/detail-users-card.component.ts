import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserDTO, DataExchangeService } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-users-card',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './detail-users-card.component.html',
  styleUrls: ['./detail-users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailUsersCardComponent implements OnInit {
  @Input({ required: true })
  user!: CreateUserDTO;

  public formGroup!: FormGroup;
  private formBuilder!: FormBuilder;

  private dataService = inject(DataExchangeService);

  ngOnInit(): void {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.formGroup.patchValue({
      name: this.user.name,
      email: this.user.email
    });
  }

  submit(): void {
    this.dataService.setData(this.formGroup.value)
  }

}
