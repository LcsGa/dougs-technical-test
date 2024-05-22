import { of } from 'rxjs';
import { CategoriesApiService } from '../categories.api.service';
import { Category } from '../types/category';

export const allCategories = [
  {
    id: 1,
    wording: 'wording 1',
    description: 'description 1',
    group: { id: 1, name: 'group 1', color: 'm-blue' },
  },
  {
    id: 2,
    wording: 'wording 2',
    description: 'description 2',
    group: { id: 2, name: 'group 2', color: 'm-green' },
  },
  {
    id: 3,
    wording: 'wording 3',
    description: 'description 3',
  },
] as const satisfies Category[];

export const [firstCategory, secondCategory, thirdCategory] = allCategories;

export const visibleCategories = [{ id: allCategories[0].id }, { id: allCategories[1].id }] as const satisfies Pick<
  Category,
  'id'
>[];

export const categoriesStubService = {
  getAll: () => of(allCategories),
  getVisibles: () => of(visibleCategories),
} satisfies Pick<CategoriesApiService, 'getAll' | 'getVisibles'>;
