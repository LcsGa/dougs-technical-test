import { Routes } from '@angular/router';
import categoriesRoutes from './categories';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'categories',
  },
  categoriesRoutes,
];
