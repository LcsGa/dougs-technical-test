import {
  ChangeDetectionStrategy,
  Component,
  SecurityContext,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PillComponent } from '../../shared/components/pill';
import { Category } from '../types/category';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PillComponent],
  selector: 'app-category-card',
  styles: `
    :host {
      --_card-bg-color: var(--card-bg-color, transparent);
      --_card-border-color: var(--card-border-color, var(--surface-border));

      display: flex;
      padding: var(--size-4);
      background-color: var(--_card-bg-color);
      outline: 1px solid var(--_card-border-color);
    }

    .card--content {
      place-self: center;
      display: grid;
      justify-items: start;
      row-gap: var(--size-1);
    }

    app-pill {
      margin-bottom: var(--size-1);
    }

    p {
      color: var(--text-tertiary);
    }
  `,
  template: `
    <div class="card--content">
      @if (withGroup() && category().group) {
        <app-pill [color]="category().group!.color">{{ category().group!.name }}</app-pill>
      }

      <h6>{{ category().wording }}</h6>

      <p [innerHTML]="safeDescription()"></p>
    </div>
  `,
})
export class CategoryCardComponent {
  readonly #domSanitizer = inject(DomSanitizer);

  readonly withGroup = input(false, { transform: booleanAttribute });

  readonly category = input.required<Category>();

  readonly safeDescription = computed(() => {
    const description = this.category().description;
    return description ? this.#domSanitizer.sanitize(SecurityContext.HTML, description) : '';
  });
}
