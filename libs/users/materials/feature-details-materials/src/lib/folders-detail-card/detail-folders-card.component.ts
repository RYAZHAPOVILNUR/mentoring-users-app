/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { onSuccessEditionCbType, onSuccessAddStoryPointsCbType } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DetailFoldersCardVm } from './detail-folders-card-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateFolderDTO, CreateUserDTO, FolderEntity, UsersEntity } from '@users/core/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DadataApiService } from '@dadata';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsAddButtonComponent } from "../../../../src/lib/user-material-create/src/lib/create-materials-button/create-materials-button.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MaterialsAddButtonComponent
],
  templateUrl: './detail-folders-card.component.html',
  styleUrls: ['./detail-folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFoldersCardComponent {
  private _vm: DetailFoldersCardVm = {
    folder: null,
    status: 'init',
    errors: null,
  };
  public get vm() {
    return this._vm;
  }
  @Input({ required: true })
  set vm(vm: DetailFoldersCardVm) {
    this._vm = vm;
  }
  @Output() closeFolder = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();

  onCloseFolder() {
    this.closeFolder.emit();
  }

  onDeleteFolder() {
    this.deleteFolder.emit();
  }
}
