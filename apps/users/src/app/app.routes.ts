import { Route } from '@angular/router';
import { authGuard, adminGuard } from '@auth/data-access';
import { AuthorizedUserLayoutComponent } from './authorized-user-layout/authorized-user-layout.component';
import { UnauthorizedUserLayoutComponentComponent } from './unauthorized-user-layout-component/unauthorized-user-layout-component.component';

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
      ...layoutAgnosticComponents
    ]
  },
  {
    path: 'guest',
    component: UnauthorizedUserLayoutComponentComponent,
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
