import { Route } from '@angular/router';
import { CategoriesService } from './categories.service';

export const route: Route = {
  path: 'categories',
  title: 'Catégories',
  providers: [CategoriesService],
  loadComponent: () => import('./categories.component'),
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'categories-group' },
    {
      path: 'categories-group',
      loadComponent: () => import('./pages/categories-group.page'),
    },
    {
      path: 'alphabetical-order',
      loadComponent: () => import('./pages/alphabetical-order.page'),
    },
  ],
};
