import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { Color, colors } from '../../types';

function parseColor(color: string | undefined) {
  return colors.find((c) => color?.includes(c));
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pill',
  host: {
    '[class]': 'color()',
    '[class.full-width]': 'fullWidth()',
  },
  styles: `
    @use '../../../../styles/typography';

    :host {
      --_pill-bg-color: var(--pill-bg-color, var(--light-neutral));
      --_pill-color: var(--pill-color, var(--neutral));

      display: var(--pill-display, inline-flex);
      align-items: center;
      padding: var(--pill-padding, var(--size-2) var(--size-3));
      height: var(--size-5);
      border-radius: var(--pill-radius, var(--radius-l));
      background-color: var(--_pill-bg-color);
      color: var(--_pill-color);
      @extend .text-tiny;

      :nth-child(n + 1) {
        display: none;
      }

      @each $color in 'blue', 'red', 'yellow', 'green', 'purple', 'pink' {
        &.#{$color} {
          --pill-bg-color: var(--light-#{$color});
          --pill-color: var(--#{$color});
        }
      }

      &.full-width {
        --pill-display: flex;
        --pill-padding: var(--size-2) var(--size-10) var(--size-2) var(--size-4);
        --pill-radius: 0;
      }
    }
  `,
  template: '<ng-content/>',
})
export class PillComponent {
  readonly color = input<Color | undefined, string | undefined>(undefined, { transform: parseColor });

  readonly fullWidth = input(false, { transform: booleanAttribute });
}
