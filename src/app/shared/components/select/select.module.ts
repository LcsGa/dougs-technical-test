import { NgModule } from '@angular/core';
import { OptionDirective } from './option.directive';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [SelectComponent, OptionDirective],
  exports: [SelectComponent, OptionDirective],
})
export class SelectModule {}
