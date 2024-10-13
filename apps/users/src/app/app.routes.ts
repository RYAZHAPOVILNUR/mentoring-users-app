import { Route } from '@angular/router';
import { authGuard, adminGuard } from '@auth/data-access';
import { AuthorizedUserLayoutComponent } from './authorized-user-layout/authorized-user-layout.component';
import { UnauthorizedUserLayoutComponent } from './unauthorized-user-layout-component/unauthorized-user-layout-component.component';
import { canDeactivateFormComponent } from '@users/core/utils';

const layoutAgnosticComponents = [
  {
    path: 'home',
    loadComponent: () => import('@users/home').then((c) => c.HomeComponent),
  },
];

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthorizedUserLayoutComponent,
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
          import('@users/users/articles/articles-create').then((c) => c.ArticlesCreateContainerComponent),
        canDeactivate: [canDeactivateFormComponent],
      },
      {
        path: 'materials',
        loadComponent: () => import('@users/materials/feature-folders-list').then((c) => c.FoldersListContainerComponent),
      },
      {
        path: 'articles',
        loadComponent: () => import('@users/users/articles/articles').then((c) => c.ArticlesViewContainerComponent),
      },
      {
        path: 'articles/:id',
        loadComponent: () => import('@users/users/articles/article-read').then((c) => c.ArticleReadContainerComponent),
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
        loadComponent: () => import('@users/users/chart').then((c) => c.ChartViewComponent),
      },
      {
        path: 'backlog',
        loadComponent: () => import('@users/users/backlog').then((c) => c.BacklogComponent),
      },
      ...layoutAgnosticComponents,
    ],
  },
  {
    path: 'guest',
    component: UnauthorizedUserLayoutComponent,
    children: [...layoutAgnosticComponents],
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/feature-login').then((c) => c.LoginContainerComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('@auth/feature-register').then((c) => c.RegisterContainerComponent),
  },
];
