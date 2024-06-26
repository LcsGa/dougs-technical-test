import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PillComponent } from '../../shared/components/pill';
import { CategoriesService } from '../categories.service';
import { CategoryCardComponent } from '../components/category-card.component';
import { CategoryCardsGridComponent } from '../components/category-cards-grid.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CategoryCardsGridComponent, CategoryCardComponent, PillComponent],
  selector: 'app-categories-group',
  styles: `
    app-pill {
      position: relative;
      z-index: 1;
    }
  `,
  template: `
    @for (groupCategories of groupedCategories(); track groupCategories.group?.id) {
      <app-pill [color]="groupCategories.group?.color" fullWidth>
        {{ groupCategories.group?.name ?? 'Sans groupe' }}
      </app-pill>

      <app-category-cards-grid>
        @for (category of groupCategories.categories; track category.id) {
          <app-category-card
            [class.selected]="category.id === categoriesService.selection()?.id"
            [category]="category"
            (click)="categoriesService.updateSelection(category)"
          />
        }
      </app-category-cards-grid>
    }
  `,
})
export default class CategoriesGroupPage {
  readonly categoriesService = inject(CategoriesService);

  readonly groupedCategories = toSignal(this.categoriesService.groupedCategories$, { initialValue: [] });
}
