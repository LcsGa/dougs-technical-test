import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CategoriesApiService } from './categories.api.service';
import { CategoriesService } from './categories.service';
import { categoriesStubService, firstCategory, secondCategory } from './tests/categories.stub.service';

describe('CategoriesService', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [CategoriesService, { provide: CategoriesApiService, useValue: categoriesStubService }],
    });
    const service = TestBed.inject(CategoriesService);

    return { service };
  }

  it('should return the 2 first visible categories', async () => {
    const { service } = setup();

    expect(await firstValueFrom(service.categories$)).toEqual([firstCategory, secondCategory]);
  });

  it('should return the categories filtered by the research', async () => {
    const { service } = setup();

    service.research.set('ding 1');

    expect(await firstValueFrom(service.categories$)).toEqual([firstCategory]);
  });

  it('should return an empty list of categories filtered by the research', async () => {
    const { service } = setup();

    service.research.set('unknown');

    expect(await firstValueFrom(service.categories$)).toEqual([]);
  });

  it('should return the categories filtered by the first group', async () => {
    const { service } = setup();

    service.group.set(secondCategory.group.id);

    expect(await firstValueFrom(service.categories$)).toEqual([secondCategory]);
  });

  it('should return an empty list of categories filtered by a valid research but the other group', async () => {
    const { service } = setup();

    service.research.set(firstCategory.wording);
    service.group.set(secondCategory.group.id);

    expect(await firstValueFrom(service.categories$)).toEqual([]);
  });

  it('should return the 2 first categories grouped', async () => {
    const { service } = setup();

    expect(await firstValueFrom(service.groupedCategories$)).toEqual([
      { group: firstCategory.group, categories: [firstCategory] },
      { group: secondCategory.group, categories: [secondCategory] },
    ]);
  });

  it('should return the 2 available groups', async () => {
    const { service } = setup();

    expect(await firstValueFrom(service.groups$)).toEqual([firstCategory.group, secondCategory.group]);
  });

  it('should select the first category', () => {
    const { service } = setup();

    expect(service.selection()).toBeNull();

    service.updateSelection(firstCategory);

    expect(service.selection()).toEqual(firstCategory);
  });
});
