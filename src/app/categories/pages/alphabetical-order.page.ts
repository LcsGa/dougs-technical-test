import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { CategoryCardComponent } from '../components/category-card.component';
import { CategoryCardsGridComponent } from '../components/category-cards-grid.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CategoryCardsGridComponent, CategoryCardComponent, AsyncPipe],
  selector: 'app-alphabetical-order',
  template: `
    <app-category-cards-grid>
      @for (category of categoriesService.categories$ | async; track category.id) {
        <app-category-card
          [class.selected]="category.id === categoriesService.selection()?.id"
          [category]="category"
          withGroup
          (click)="categoriesService.updateSelection(category)"
        />
      }
    </app-category-cards-grid>
  `,
})
export default class AlphabeticalOrderPage {
  readonly categoriesService = inject(CategoriesService);
}
