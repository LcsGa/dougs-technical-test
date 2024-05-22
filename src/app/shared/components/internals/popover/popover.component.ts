import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-popover',
  styles: `
    :host {
      position: absolute;
      display: inline-block;
      left: 0;
      top: calc(100% + var(--size-1));
      width: 100%;
      max-height: 200px;
      background: var(--white);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-xs);
      overflow: hidden auto;
      z-index: 9999;
    }
  `,
  template: `<ng-content />`,
})
export class PopoverComponent {
  readonly #host: HTMLElement = inject(ElementRef).nativeElement;

  readonly target = input.required<HTMLElement>();

  readonly clickOutside = outputFromObservable(
    fromEvent<{ target: Node }>(window, 'mousedown').pipe(
      map(({ target }) => !this.#host.contains(target) && !this.target().contains(target)),
      filter(Boolean),
    ),
  );
}
