import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { rxEffect } from 'ngxtension/rx-effect';
import { merge, switchMap, tap } from 'rxjs';
import { FormFieldComponent } from '../form-field/form-field.component';
import { IconComponent } from '../icon';
import { PopoverComponent, PopoverDirective } from '../internals/popover';
import { OptionDirective } from './option.directive';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormFieldComponent, PopoverComponent, IconComponent],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }],
  selector: 'app-select',
  hostDirectives: [PopoverDirective],
  styles: `
    app-select {
      position: relative;
      display: inline-block;

      app-form-field {
        width: 271px;

        fieldset {
          cursor: pointer;
        }
      }

      app-popover {
        padding: var(--size-1);

        .dropdown-content {
          display: grid;
          row-gap: var(--size-1);
        }

        option {
          padding: var(--size-1);
          border-radius: var(--radius-xs);
          cursor: pointer;

          &:hover {
            background-color: var(--surface-hover);
          }

          &.selected {
            background-color: var(--light-blue);
            color: var(--blue);
          }
        }
      }
    }
  `,
  template: `
    <app-form-field (click)="popoverDirective.toggle()">
      <p>{{ optionSelected()?.label ?? placeholder() }}</p>

      <app-icon suffix name="chevron-down" />
    </app-form-field>

    @if (options().length && popoverDirective.opened()) {
      <app-popover [target]="formFieldElRef().nativeElement" (clickOutside)="popoverDirective.hide()">
        <div class="dropdown-content"><ng-content /></div>
      </app-popover>
    }
  `,
})
export class SelectComponent<T extends string | number | null> implements ControlValueAccessor {
  readonly popoverDirective = inject(PopoverDirective);

  readonly placeholder = input<string>();

  readonly formFieldElRef = viewChild.required<FormFieldComponent, ElementRef<HTMLElement>>(FormFieldComponent, {
    read: ElementRef,
  });

  readonly options = contentChildren<OptionDirective<T>>(OptionDirective);

  readonly selection = signal<T | null>(null);

  readonly optionSelected = computed(() => this.options().find(({ value }) => value() === this.selection()));

  readonly #selectOption = rxEffect(
    toObservable(this.options).pipe(
      switchMap((options) =>
        merge(
          ...options.map((option) =>
            option.click$.pipe(
              tap(() => {
                const value = option.value();
                this.selection.set(value);
                this.#onChange(value);
                this.popoverDirective.hide();
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly #onSelection = effect(
    () => {
      const selection = this.optionSelected();
      const unselected = this.options().filter((option) => option.value() !== selection?.value());

      unselected.forEach((option) => option.deselect());
      selection?.select();
    },
    { allowSignalWrites: true },
  );

  #onChange = (value: T) => {};
  #onTouched = () => {};

  writeValue(value: T): void {
    this.selection.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: VoidFunction): void {
    this.#onTouched = fn;
  }
}
