import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { Color } from '../../types';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-button',
  host: { '[class]': 'color()' },
  styles: `
    :host {
      display: contents;

      @each $color in 'blue', 'red', 'yellow', 'green', 'purple', 'pink' {
        &.#{$color} {
          --button-bg-color: var(--#{$color});
        }
      }
    }

    button {
      display: inline-flex;
      align-items: center;
      border-radius: var(--radius-xs);
      background-color: var(--button-bg-color);
      color: var(--white);
      height: var(--inline-block-height);
      padding-inline: var(--size-3);
      font-weight: 700;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        pointer-events: none;
      }
    }
  `,
  template: `<button [disabled]="disabled()"><ng-content /></button>`,
})
export class ButtonComponent {
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly color = input<Color>('blue');
}
