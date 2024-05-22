import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { FormFieldModule } from '../../shared/components/form-field';
import { IconComponent } from '../../shared/components/icon';
import { SelectModule } from '../../shared/components/select';
import { CategoriesService } from '../categories.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormFieldModule, IconComponent, SelectModule, FormsModule],
  selector: 'app-category-search',
  host: { role: 'search' },
  styles: `
    :host {
      display: flex;
      column-gap: var(--size-4);
      padding: var(--size-4) var(--size-4) var(--size-6);

      app-form-field {
        &:has(input) {
          flex: 1;
        }
      }
    }
  `,
  template: `
    <app-form-field>
      <app-icon prefix name="magnifying-glass" />

      <input type="text" placeholder="Rechercher une catégorie" [(ngModel)]="categoriesService.research" />
    </app-form-field>

    <app-select [(ngModel)]="categoriesService.group">
      <option [value]="null">Toutes les catégories</option>

      @for (group of groups(); track group.id) {
        <option [value]="group.id">{{ group.name }}</option>
      }
    </app-select>
  `,
})
export class CategorySearchComponent {
  readonly categoriesService = inject(CategoriesService);

  readonly groups = toSignal(this.categoriesService.groups$, { initialValue: [] });
}
