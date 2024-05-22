import { Directive, model } from '@angular/core';

@Directive({ standalone: true })
export class PopoverDirective {
  readonly opened = model(false);

  show() {
    this.opened.set(true);
  }

  hide() {
    this.opened.set(false);
  }

  toggle() {
    this.opened.set(!this.opened());
  }
}
