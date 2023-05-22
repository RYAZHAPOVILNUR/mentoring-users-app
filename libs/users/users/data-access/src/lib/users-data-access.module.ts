import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';

@NgModule({
  providers: [UsersFacade],
  imports: [
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UserDataAccessModule {}
