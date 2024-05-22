import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs';

export type IconName = 'layer-group' | 'arrow-down-a-z' | 'magnifying-glass' | 'chevron-down';

@Component({
  standalone: true,
  selector: 'app-icon',
  host: { '[innerHTML]': 'svgIcon()' },
  styles: `
    :host {
      display: inline-grid;
      place-items: center;
      width: var(--size-3-5);
      aspect-ratio: 1;
      color: inherit;
    }
  `,
  template: '',
})
export class IconComponent {
  readonly #httpClient = inject(HttpClient);
  readonly #domSanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();

  readonly svgIcon = toSignal(
    toObservable(this.name).pipe(
      switchMap((name) =>
        this.#httpClient
          .get(`icons/${name}.svg`, { responseType: 'text' })
          .pipe(map((svgIcon) => this.#domSanitizer.bypassSecurityTrustHtml(svgIcon))),
      ),
    ),
  );
}
