import { Route } from '@angular/router';
import { authGuard, adminGuard } from '@auth/data-access';
import { AuthorizedUserLayoutComponent } from './authorized-user-layout/authorized-user-layout.component';
import { UnauthorizedUserLayoutComponent } from './unauthorized-user-layout-component/unauthorized-user-layout-component.component';
import { canDeactivateFormComponent } from '@users/core/utils';

const layoutAgnosticComponents = [
  {
    path: 'home',
    loadComponent: () => import('@users/home').then(c => c.HomeComponent)
  }
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
            loadComponent: () => import('@users/feature-users-list').then(c => c.UsersListContainerComponent)
          },
          {
            path: 'users/:id',
            loadComponent: () => import('@users/feature-users-detail').then(c => c.UsersDetailComponent),
          }
        ],
      },
      {
        path: 'profile',
        loadComponent: () => import('@users/users/profile/feature-profile').then(c => c.ProfileContainerComponent),
      },
      {
        path: 'article-editor',
        loadComponent: () => import('@users/users/articles/articles-create').then(c => c.ArticlesCreateContainerComponent),
        canDeactivate: [canDeactivateFormComponent]
      },
      {
        path: 'articles',
        loadComponent: () => import('@users/users/articles/articles').then(c => c.ArticlesViewContainerComponent),
      },
      {
        path: 'tasks',
        loadComponent: () => import('@users/users/tasks/tasks-view-container').then(c => c.TasksContainerComponent)
      },
      ...layoutAgnosticComponents
    ]
  },
  {
    path: 'guest',
    component: UnauthorizedUserLayoutComponent,
    children: [
      ...layoutAgnosticComponents
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/feature-login').then(c => c.LoginContainerComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('@auth/feature-register').then(c => c.RegisterContainerComponent)
  },
];
