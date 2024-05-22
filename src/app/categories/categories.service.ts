import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, filter, forkJoin, map, shareReplay, tap } from 'rxjs';
import { createRepeat, toState } from '../shared/rxjs';
import { distinct, isNotNil, sortBy, textContains } from '../shared/utils';
import { CategoriesApiService } from './categories.api.service';
import { Category, CategoryGroup } from './types/category';

const ONE_HOUR_MILLIS = 60 * 60 * 1000;

@Injectable()
export class CategoriesService {
  readonly #categoriesApiService = inject(CategoriesApiService);

  readonly research = signal<Category['wording']>('');

  readonly group = signal<CategoryGroup['id'] | null>(null);

  readonly retry = createRepeat();

  readonly categoriesState$ = forkJoin(
    [
      this.#categoriesApiService.getAll(),
      this.#categoriesApiService.getVisibles().pipe(map((visibles) => visibles.map(({ id }) => id))),
    ],
    (all, visibles) => all.filter(({ id }) => visibles.includes(id)),
  ).pipe(toState(), this.retry(), shareReplay(1, ONE_HOUR_MILLIS));

  readonly #categories$ = this.categoriesState$.pipe(
    filter(({ pending, error }) => !pending && !error),
    map(({ data }) => data),
    filter(isNotNil),
  );

  readonly groups$ = this.#categories$.pipe(
    map((categories) => this.#getDistinctGroups(categories).toSorted(sortBy('name'))),
    shareReplay(1),
  );

  readonly categories$ = combineLatest([toObservable(this.research), toObservable(this.group), this.#categories$]).pipe(
    tap(() => this.#selection.set(null)),
    map(([research, selectedGroup, categories]) =>
      categories
        .filter(({ wording, group }) => textContains(wording, research) && this.#groupsMatch(selectedGroup, group))
        .toSorted(sortBy('wording')),
    ),
    shareReplay(1),
  );

  readonly groupedCategories$ = combineLatest([this.groups$, this.categories$]).pipe(
    map(([groups, categories]) =>
      Array.from(
        categories
          .reduce((groupedCategories, category) => {
            groupedCategories.get(category.group?.id)?.categories.push(category);
            return groupedCategories;
          }, this.#toGroupedCategoriesMap(groups))
          .values(),
      ).filter(({ categories }) => categories.length),
    ),
    shareReplay(1),
  );

  readonly #selection = signal<Category | null>(null);
  readonly selection = this.#selection.asReadonly();

  updateSelection(category: Category) {
    this.#selection.update((selection) => (selection?.id === category.id ? null : category));
  }

  select() {
    const selection = this.#selection();

    if (selection) {
      alert(
        `La catégorie n°${selection.id} a été selectionnée :\n` +
          `- Titre : ${selection.wording}\n` +
          `- Description : ${selection.description}`,
      );
    }
  }

  #groupsMatch(selectedGroup: CategoryGroup['id'] | null, group: CategoryGroup | undefined) {
    return selectedGroup === null || selectedGroup === group?.id;
  }

  #getDistinctGroups(categories: Category[]) {
    const groups = categories.map(({ group }) => group).filter(isNotNil);
    return distinct(groups, ({ id }) => id);
  }

  #toGroupedCategoriesMap(groups: CategoryGroup[]) {
    type GroupCategoryEntry = [number | undefined, { group?: CategoryGroup; categories: Category[] }];

    const entries = [...groups, undefined].map(
      (group): GroupCategoryEntry => [group?.id, { group, categories: [] as Category[] }],
    );

    return new Map(entries);
  }
}
