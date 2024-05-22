import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-category-cards-grid',
  styles: `
    app-category-cards-grid {
      $cols: 2;
      $radius: var(--radius-xs);

      display: grid;
      grid-template-columns: repeat($cols, 1fr);
      gap: 1px;

      app-category-card {
        cursor: pointer;

        &:hover {
          --card-bg-color: var(--surface-hover);
        }

        &.selected {
          --card-bg-color: var(--light-blue);
          --card-border-color: var(--blue);
          z-index: 2;
        }
      }

      &:last-child {
        app-category-card {
          &:nth-child(#{$cols}n + 1):not(:nth-last-child(n + #{$cols + 1})) {
            border-bottom-left-radius: $radius;
          }

          &:nth-child(#{$cols}n):last-child {
            border-bottom-right-radius: $radius;
          }
        }
      }
    }
  `,
  template: `<ng-content select="app-category-card" />`,
})
export class CategoryCardsGridComponent {}
