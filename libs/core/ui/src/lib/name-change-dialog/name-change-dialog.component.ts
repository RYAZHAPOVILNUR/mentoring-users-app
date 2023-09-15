import { usersVMAdapter } from './../../../../../users/users/users-vm.adapter';
import { UsersVM } from './../../../../../users/users/users-vm';
import { UsersFacade } from "@users/users/data-access";
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputNameComponent } from '../input-name/input-name.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import {PushPipe} from "@ngrx/component";
import { ComponentStore } from "@ngrx/component-store";
import { DeepReadonly } from '@users/core/utils';
import { UsersEntity } from '@users/core/data-access';
// import {UsersVM} from "@users/users-vm";


type UsersListState = DeepReadonly<{
  users: UsersVM[]
}>

const initialState: UsersListState = {
  users: []
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'name-change-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputNameComponent,
    MatTooltipModule,
    PushPipe
  ],
  templateUrl: './name-change-dialog.component.html',
  styleUrls: ['./name-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameChangeDialogComponent extends ComponentStore<UsersListState>{
  public dialogRef = inject(MatDialogRef<NameChangeDialogComponent>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersFacade = inject(UsersFacade);
  public readonly users$ = this.select(({ users }) => users);

  public formGroup = new FormBuilder().group({
    newName: new FormControl('', [Validators.required]),
  }); 

  public nameIsAvailable$ = new BehaviorSubject(true);

  private setUsersFromGlobalToLocalStore(): void {
    this.effect(
      () => this.usersFacade.allUsers$.pipe(
        tap((users: UsersEntity[]) => this.patchUsers(users))
      )
    )
  }

  
  private patchUsers(users: UsersEntity[]): void {
    this.patchState({
      users: users.map(
        user => usersVMAdapter.entityToVM(user)
      )
    })
  }

  constructor() {
    super(initialState);
    this.checkNameExist()
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  checkNameExist() {
    this.formGroup.controls.newName
    .valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
        )
      .subscribe(() => {
        // const nameExists = this.users.some(user => user.name === newName);
        const nameExists = initialState.users.some(user => user.name === this.formGroup.value.newName);
        this.nameIsAvailable$.next(!nameExists);
      })
  }

}
