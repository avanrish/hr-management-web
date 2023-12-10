import { Routes as TRoutes } from '@angular/router';
import { Routes } from './routes';

export const routes: TRoutes = [
  {
    path: Routes.HOME,
    redirectTo: Routes.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: Routes.DASHBOARD,
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    title: 'Dashboard | HR Management',
  },
  {
    path: Routes.SIGNIN,
    loadComponent: () =>
      import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
    title: 'Sign In | HR Management',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
    title: 'Not Found | HR Management',
  },
];
