import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonComponent } from '../components/button';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  selector: 'app-error-retry',
  styles: `
    :host {
      display: grid;
      justify-items: center;
      row-gap: var(--size-3);
      color: var(--red);
    }
  `,
  template: `
    <p>
      <ng-content>Une erreur est survenue...</ng-content>
    </p>

    <app-button color="red" (click)="retry.emit()">Réessayer</app-button>
  `,
})
export class ErrorRetryComponent {
  readonly retry = output();
}
