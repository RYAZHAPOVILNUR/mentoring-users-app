// import { Route } from '@angular/router';
// import { authGuard, adminGuard } from '@auth/data-access';
//
// const layoutAgnosticComponents = [
//   {
//     path: 'home',
//     loadComponent: () => import('@users/home').then(c => c.HomeComponent)
//   }
// ]
//
// export const appRoutes: Route[] = [
//   {
//     path: '',
//     component: AuthorizedUserLayout,
//     canActivate: [authGuard],
//     children: [
//       {
//         path: 'admin',
//         canActivateChild: [adminGuard],
//         children: [
//           {
//             path: 'users',
//             loadComponent: () => import('@users/feature-users-list').then(c => c.UsersListContainerComponent)
//           },
//           {
//             path: 'users/:id',
//             loadComponent: () => import('@users/feature-users-detail').then(c => c.UsersDetailComponent),
//           },
//           ...layoutAgnosticComponents
//         ],
//       },
//       {
//         path: 'profile',
//         loadComponent: () => import('@users/users/profile/feature-profile').then(c => c.ProfileContainerComponent),
//       },
//     ]
//   },
//   {
//     path: 'guest',
//     component: UnauthorizedUserLayout,
//     children: [
//       ...layoutAgnosticComponents
//     ]
//   },
//   {
//     path: 'login',
//     loadComponent: () => import('@auth/feature-login').then(c => c.LoginContainerComponent)
//   },
//   {
//     path: 'signup',
//     loadComponent: () => import('@auth/feature-register').then(c => c.RegisterContainerComponent)
//   },
// ];




import { Route } from '@angular/router';
import { authGuard, adminGuard } from '@auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@users/home').then(c => c.HomeComponent)
  },
  {
    path: 'admin',
    canActivateChild: [authGuard, adminGuard],
    children: [
      {
        path: 'users',
        loadComponent: () => import('@users/feature-users-list').then(c => c.UsersListContainerComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('@users/feature-users-detail').then(c => c.UsersDetailComponent),
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () => import('@users/users/profile/feature-profile').then(c => c.ProfileContainerComponent)
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
