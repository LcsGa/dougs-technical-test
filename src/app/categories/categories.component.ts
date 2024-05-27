import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/components/button';
import { CardComponent } from '../shared/components/card';
import { TabComponent } from '../shared/components/tab';
import { State } from '../shared/rxjs';
import { ErrorRetryComponent, LayoutComponent } from '../shared/templates';
import { CategoriesService } from './categories.service';
import { CategorySearchComponent } from './components/category-search.component';
import { Category } from './types/category';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LayoutComponent,
    TabComponent,
    CardComponent,
    CategorySearchComponent,
    RouterOutlet,
    ButtonComponent,
    ErrorRetryComponent,
  ],
  selector: 'app-categories',
  styles: `
    app-card {
      container-type: inline-size;
    }

    .message {
      padding: 0 var(--size-3) var(--size-3);

      &:is(p) {
        text-align: center;
      }
    }
  `,
  template: `
    <app-layout>
      <ng-container header>
        <app-tab link="categories-group" icon="layer-group" label="Groupe de catégorie" />

        <app-tab link="alphabetical-order" icon="arrow-down-a-z" label="Ordre alphabétique" />
      </ng-container>

      <app-card>
        <app-category-search />

        @if (categoriesState().data) {
          <router-outlet />
        } @else if (categoriesState().pending) {
          <p class="message">Chargement des categories en cours...</p>
        } @else if (categoriesState().error) {
          <app-error-retry class="message" (retry)="categoriesService.retry.emit()">
            Erreur lors du chargement des categories...
          </app-error-retry>
        }
      </app-card>

      <ng-container footer>
        <app-button [disabled]="!categoriesService.selection()" (click)="categoriesService.select()">
          Sélectionner la catégorie
        </app-button>
      </ng-container>
    </app-layout>
  `,
})
export default class CategoriesComponent {
  readonly categoriesService = inject(CategoriesService);

  readonly categoriesState = toSignal(this.categoriesService.categoriesState$, {
    initialValue: { pending: true } as State<Category[]>,
  });
}
