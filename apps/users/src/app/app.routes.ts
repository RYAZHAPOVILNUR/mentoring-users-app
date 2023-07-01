import { Route } from '@angular/router';
import { authGuard, adminGuard } from '@auth/data-access';


// TODO то как это будет выглядеть при добавлении слоя /admin
export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivateChild: [authGuard, adminGuard],
    children: [
      {
        path: 'users',
        loadComponent: () => import('@users/home').then(c => c.HomeComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('@users/feature-users-detail').then(c => c.UsersDetailComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@auth/feature-login').then(c => c.LoginContainerComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('@auth/feature-register').then(c => c.RegisterContainerComponent)
  }
];
