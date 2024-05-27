import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-category-cards-grid',
  styles: `
    @mixin bottomCornersRadius($cols) {
      app-category-cards-grid {
        --card-columns: #{$cols};
      }

      app-category-card {
        &:nth-child(#{$cols}n + 1):not(:nth-last-child(n + #{$cols + 1})) {
          --card-border-bottom-left-radius: var(--radius-xs);
        }

        &:nth-child(#{$cols}n):last-child {
          --card-border-bottom-right-radius: var(--radius-xs);
        }
      }
    }

    @include bottomCornersRadius(3);

    @container (width < 720px) {
      @include bottomCornersRadius(1);
    }

    app-category-cards-grid {
      display: grid;
      grid-template-columns: repeat(var(--card-columns), 1fr);
      gap: 1px;

      app-category-card {
        cursor: pointer;
        border-bottom-left-radius: var(--card-border-bottom-left-radius, none);
        border-bottom-right-radius: var(--card-border-bottom-right-radius, none);

        &:hover {
          --card-bg-color: var(--surface-hover);
        }

        &.selected {
          --card-bg-color: var(--light-blue);
          --card-border-color: var(--blue);
          z-index: 2;
        }
      }
    }
  `,
  template: `<ng-content select="app-category-card" />`,
})
export class CategoryCardsGridComponent {}
