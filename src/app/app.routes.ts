import { Routes as TRoutes } from '@angular/router';
import { Routes } from './routes';
import { AuthGuard, LoggedInGuard } from './auth/auth.guard';

export const routes: TRoutes = [
  {
    path: Routes.HOME,
    redirectTo: Routes.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: Routes.DASHBOARD,
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    title: 'Dashboard | HR Management',
  },
  {
    path: Routes.SIGNIN,
    canActivate: [LoggedInGuard],
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
