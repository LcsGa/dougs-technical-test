import { Directive, ElementRef, inject, input, signal } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  standalone: true,
  host: { '[class.selected]': 'selected()' },
  selector: 'option',
})
export class OptionDirective<T extends string | number | null> {
  readonly #option: HTMLOptionElement = inject(ElementRef).nativeElement;

  readonly value = input.required<T>();

  get label() {
    return this.#option.textContent;
  }

  readonly #selected = signal(false);
  readonly selected = this.#selected.asReadonly();

  readonly click$ = fromEvent(this.#option, 'click');

  select() {
    this.#selected.set(true);
  }

  deselect() {
    this.#selected.set(false);
  }
}
