import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { API_URL } from '@users/core/http';
import { environment } from '../environments/environment.development';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersReducer, userEffects } from '@users/users/data-access';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authEffects, authFeature, tokenInterceptor } from '@auth/data-access';
import { SettingsEffects, settingsFeature } from '@users/settings/data-access';
import { DADATA_TOKEN } from '@users/core/dadata';
import { provideQuillConfig } from 'ngx-quill/config';
import { articlesEffects, articlesFeature, commentsEffects, commentsFeature } from '@users/users/articles/data-access';
import { tasksEffects, tasksFeature } from '@users/users/task/data-access';
import { CLIENT_ID, githubApiEffects, githubApiFeature } from '@users/core/github-api/data-access';
import { backlogFeature, backlogEffects } from '@users/users/backlog/data-access';
import { MaterialsEffects, materialsFeature } from '@users/materials/data-access';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(
      userEffects,
      authEffects,
      articlesEffects,
      tasksEffects,
      commentsEffects,
      githubApiEffects,
      backlogEffects,
      SettingsEffects,
      MaterialsEffects
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
      [materialsFeature.name]: materialsFeature.reducer
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
      provide: DADATA_TOKEN,
      useValue: environment.dadata_api_key,
    },
    {
      provide: CLIENT_ID,
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
      })
    ),
  ],
};
