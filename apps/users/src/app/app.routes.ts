import { Route } from '@angular/router';

import { canDeactivateGuard } from '@shared/util-router';
import { adminGuard, authGuard } from '@users/core/data-access-auth';
import { AuthorizedLayoutComponent, UnauthorizedLayoutComponent } from '@users/core/ui-layout';

const layoutAgnosticComponents = [
  {
    path: 'home',
    loadComponent: () => import('@users/home').then((c) => c.HomeComponent),
  },
];

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivateChild: [adminGuard],
        children: [
          {
            path: 'users',
            loadComponent: () => import('@users/feature-users-list').then((c) => c.UsersListContainerComponent),
          },
          {
            path: 'users/:id',
            loadComponent: () => import('@users/feature-users-detail').then((c) => c.UsersDetailComponent),
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () => import('@users/users/profile/feature-profile').then((c) => c.ProfileContainerComponent),
      },
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('@users/users/profile/feature-profile').then((c) => c.UserProfileContainerComponent),
      },
      {
        path: 'article-editor',
        loadComponent: () =>
          import('@users/articles/feature-article-create').then((c) => c.ArticlesCreateContainerComponent),
        canDeactivate: [canDeactivateGuard],
      },
      {
        path: 'articles',
        loadComponent: () => import('@users/articles/feature-articles').then((c) => c.ArticleListContainerComponent),
      },
      {
        path: 'articles/:id',
        loadComponent: () =>
          import('@users/articles/feature-article-details').then((c) => c.ArticleDetailsContainerComponent),
      },
      {
        path: 'tasks',
        loadComponent: () => import('@users/users/task').then((c) => c.TasksContainerComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('@users/settings').then((c) => c.SettingsComponent),
      },
      {
        path: 'chart',
        loadComponent: () => import('@users/chart/feature-chart').then((c) => c.ChartComponent),
      },
      {
        path: 'backlog',
        loadComponent: () => import('@users/backlog/feature-backlog').then((c) => c.BacklogComponent),
      },
      ...layoutAgnosticComponents,
    ],
  },
  {
    path: 'guest',
    component: UnauthorizedLayoutComponent,
    children: [...layoutAgnosticComponents],
  },
  {
    path: 'login',
    loadComponent: () => import('@users/auth/feature-login').then((c) => c.LoginContainerComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('@users/auth/feature-register').then((c) => c.RegisterContainerComponent),
  },
];
