import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from './types/category';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  readonly #httpClient = inject(HttpClient);

  getAll() {
    return this.#httpClient.get<Category[]>('/api/all-categories');
  }

  getVisibles() {
    return this.#httpClient.get<Pick<Category, 'id'>[]>('/api/visible-categories');
  }
}
