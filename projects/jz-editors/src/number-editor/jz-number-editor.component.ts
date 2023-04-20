import { Component, Input, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZValidatorRequiredRule } from '../validator';
import { JZNumberEditorOptions } from './models';

@Component({
  selector: 'jz-number-editor',
  templateUrl: './jz-number-editor.component.html',
})
export class JZNumberEditorComponent
  extends JZEditorCommonComponent<number, JZNumberEditorOptions, JZNumberEditorComponent>
  implements OnInit
{
  /** Especifica se o valor zero (0) deve ser considerado válido. Padrão é 'false'. */
  @Input() zeroIsValid: boolean;

  protected override execOnInit() {
    super.execOnInit();

    if (this.required && this.zeroIsValid) {
      const hasRule = this.validationRules?.find(item => item.type === 'required') as JZValidatorRequiredRule;

      if (hasRule) {
        hasRule.zeroIsValid = true;
      }
    }
  }

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.zeroIsValid) this.zeroIsValid = options.zeroIsValid;
    }
  }
}
