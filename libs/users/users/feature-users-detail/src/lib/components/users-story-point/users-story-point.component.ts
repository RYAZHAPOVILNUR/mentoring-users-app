import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'users-story-point',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-story-point.component.html',
  styleUrls: ['./users-story-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersStoryPointComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  @Input({ required: true }) storyPoint?: number;
  @Output() emitStoryPoints = new EventEmitter<number>();

  storyPointsControl = this.fb.nonNullable.control(
    { value: '', disabled: true },
    [Validators.pattern(/^[0-9]+$/)]
  );

  ngOnInit(): void {
    this.storyPointsControl.patchValue(String(this.storyPoint));
  };

  onAddButtonClick(): void {
    this.storyPointsControl.enable();
  };

  onCloseButtonClick(): void {
    this.storyPointsControl.disable();
    this.storyPointsControl.patchValue(String(this.storyPoint));
  };

  onDoneButtonClick(): void {
    this.emitStoryPoints.emit(Number(this.storyPointsControl.getRawValue()));
    this.storyPointsControl.disable();
  };
}
