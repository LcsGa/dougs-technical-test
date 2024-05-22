import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card',
  styles: `
    :host {
      display: block;
      background-color: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-xs);
    }
  `,
  template: '<ng-content />',
})
export class CardComponent {}
