import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideQuillConfig } from 'ngx-quill/config';

import { API_URL } from '@core/data-access-api';
import { tokenInterceptor } from '@core/data-access-interceptors';
import { ADDRESS_API_KEY } from '@shared/data-access-address';
import { GITHUB_CLIENT_ID, githubEffects, githubApiFeature } from '@shared/data-access-github';
import { articlesEffects, articlesFeature } from '@users/articles/data-access-article';
import { commentsEffects, commentsFeature } from '@users/articles/data-access-comment';
import { authFeature, authEffects } from '@users/core/data-access-auth';
import { SettingsEffects, settingsFeature } from '@users/settings/data-access';
import { backlogEffects, backlogFeature } from '@users/users/backlog/data-access';
import { userEffects, USERS_FEATURE_KEY, usersReducer } from '@users/users/data-access';
import { TasksEffects, tasksFeature } from '@users/users/task/data-access';

import { appRoutes } from './app.routes';
import { environment } from '../environments/environment.development';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(
      userEffects,
      authEffects,
      articlesEffects,
      TasksEffects,
      commentsEffects,
      githubEffects,
      backlogEffects,
      SettingsEffects,
    ),
    provideStore({
      router: routerReducer,
      [USERS_FEATURE_KEY]: usersReducer,
      [settingsFeature.name]: settingsFeature.reducer,
      [authFeature.name]: authFeature.reducer,
      [articlesFeature.name]: articlesFeature.reducer,
      [commentsFeature.name]: commentsFeature.reducer,
      [tasksFeature.name]: tasksFeature.reducer,
      [githubApiFeature.name]: githubApiFeature.reducer,
      [backlogFeature.name]: backlogFeature.reducer,
    }),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    {
      provide: ADDRESS_API_KEY,
      useValue: environment.address_api_key,
    },
    {
      provide: GITHUB_CLIENT_ID,
      useValue: environment.github_client_id,
    },
    provideAnimations(),
    provideQuillConfig({
      modules: {
        syntax: true,
      },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
    ),
  ],
};
