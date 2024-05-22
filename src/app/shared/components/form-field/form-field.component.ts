import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  ElementRef,
  inject,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-form-field',
  styles: `
    @use '../../../../styles/typography';

    app-form-field {
      display: inline-block;

      fieldset {
        width: 100%;
        display: inline-flex;
        align-items: center;
        column-gap: var(--size-2);
        border: 1px solid var(--surface-border);
        border-radius: var(--radius-xs);
        padding: 9.5px 9px;
        height: var(--inline-block-height);
        color: var(--text-primary);
        @extend .text-tiny;
        cursor: text;

        ::placeholder {
          color: var(--text-primary);
        }

        .field {
          flex: 1;

          * {
            border: none;
            background: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            outline: none;
            resize: none;
            width: 100%;
          }
        }
      }
    }
  `,
  template: `
    <fieldset (click)="field()?.focus()">
      <ng-content select="[prefix]" />

      <div class="field"><ng-content /></div>

      <ng-content select="[suffix]" />
    </fieldset>
  `,
})
export class FormFieldComponent {
  readonly field = contentChild(FieldDirective);
}

@Directive({
  standalone: true,
  selector: 'input, textarea, select',
})
export class FieldDirective {
  readonly element: HTMLElement = inject(ElementRef).nativeElement;

  focus() {
    this.element.focus();
  }
}

@NgModule({
  imports: [FormFieldComponent, FieldDirective],
  exports: [FormFieldComponent, FieldDirective],
})
export class FormFieldModule {}
