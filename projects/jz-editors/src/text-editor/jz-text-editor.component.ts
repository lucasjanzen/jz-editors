import { Component, Input, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZValidatorEmailRule } from '../validator';
import { JZTextEditorOptions } from './models';
import { JZTextEditorModes } from './types';

@Component({
  selector: 'jz-text-editor',
  templateUrl: './jz-text-editor.component.html',
})
export class JZTextEditorComponent
  extends JZEditorCommonComponent<string, JZTextEditorOptions, JZTextEditorComponent>
  implements OnInit
{
  @Input() mode: JZTextEditorModes = 'text';

  protected override execOnInit() {
    super.execOnInit();

    if (this.mode === 'email') {
      const hasRule = this.validationRules?.find(item => item.type === 'email');

      if (!hasRule) {
        const emailRule: JZValidatorEmailRule = { type: 'email' };
        this.validationRules?.length ? this.validationRules.push(emailRule) : (this.validationRules = [emailRule]);
      }
    }
  }

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.mode) this.mode = options.mode;
    }
  }
}
