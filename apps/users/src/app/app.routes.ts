import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@users/home').then(c => c.HomeComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('@users/feature-users-detail').then(c => c.DetailUsersContainerComponent)
  }
];
