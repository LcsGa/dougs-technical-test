import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent, IconName } from '../icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  selector: 'app-tab',
  styles: `
    :host {
      display: contents;
    }

    button {
      display: inline-flex;
      align-items: center;
      column-gap: var(--size-2);
      padding: var(--size-2);
      border-radius: var(--radius-xs);
      background-color: var(--tab-bg-color, transparent);
      color: var(--tab-color, var(--text-secondary));
      cursor: pointer;

      span {
        font-size: var(--text-tiny-size);
        font-weight: 600;
        line-height: 14.4px;
      }

      &.active {
        --tab-bg-color: var(--light-blue);
        --tab-color: var(--blue);
      }
    }
  `,
  template: `
    <button [routerLink]="link()" routerLinkActive="active">
      <app-icon [name]="icon()" />

      <span>{{ label() }}</span>
    </button>
  `,
})
export class TabComponent {
  readonly link = input.required<RouterLink['routerLink']>();

  readonly icon = input.required<Extract<IconName, 'layer-group' | 'arrow-down-a-z'>>();

  readonly label = input.required<string>();
}
