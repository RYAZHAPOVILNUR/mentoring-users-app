import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from '@users/core/http';
import { environment } from '../environments/environment.development';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersFacade, usersReducer, userEffects } from '@users/users/data-access';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNoopAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(userEffects),
    provideState(USERS_FEATURE_KEY, usersReducer),
    provideStore(),
    UsersFacade,
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    {
        provide: API_URL,
        useValue: environment.api_url,
    },
    provideNoopAnimations()
],
};
