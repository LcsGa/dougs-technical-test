import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout',
  styles: `
    @use '../../../styles/responsive';

    $banner-height: 60px;

    :host {
      display: block;
      min-height: 100dvh;
      background-color: var(--surface-ground);
    }

    header,
    footer,
    main {
      padding-inline: 122px;

      @include responsive.mobile {
        padding-inline: var(--size-4);
      }
    }

    header,
    footer {
      display: flex;
      align-items: center;
      height: $banner-height;
      background-color: var(--surface-section);
      z-index: 9999;
    }

    nav,
    footer {
      column-gap: var(--size-2);
    }

    header {
      column-gap: var(--size-6);
    }

    nav {
      display: inline-flex;
      align-items: center;
    }

    main {
      --layout-padding-inline: var(--size-8);

      padding-top: var(--layout-padding-inline);
      padding-bottom: calc(var(--layout-padding-inline) + #{$banner-height});

      @include responsive.mobile {
        --layout-padding-inline: var(--size-4);
      }
    }

    footer {
      position: fixed;
      bottom: 0;
      disabled: flex;
      justify-content: end;
      width: 100%;

      &:empty {
        display: none;
      }
    }
  `,
  template: `
    <header>
      <h4>{{ title.getTitle() }}</h4>

      <nav><ng-content select="[header]" /></nav>
    </header>

    <main>
      <ng-content />
    </main>

    <footer>
      <ng-content select="[footer]" />
    </footer>
  `,
})
export class LayoutComponent {
  readonly title = inject(Title);
}
