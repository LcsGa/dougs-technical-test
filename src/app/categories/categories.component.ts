import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/components/button';
import { CardComponent } from '../shared/components/card';
import { TabComponent } from '../shared/components/tab';
import { ErrorRetryComponent, LayoutComponent } from '../shared/templates';
import { CategoriesService } from './categories.service';
import { CategorySearchComponent } from './components/category-search.component';

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
    AsyncPipe,
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

        @if (categoriesService.categoriesState$ | async; as state) {
          @if (state.data) {
            <router-outlet />
          } @else if (state.pending) {
            <p class="message">Chargement des categories en cours...</p>
          } @else if (state.error) {
            <app-error-retry class="message" (retry)="categoriesService.retry.emit()">
              Erreur lors du chargement des categories...
            </app-error-retry>
          }
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
}
