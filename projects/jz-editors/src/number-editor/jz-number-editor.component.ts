import { Component, Input, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZNumberEditorOptions } from './models';

@Component({
  selector: 'jz-number-editor',
  templateUrl: './jz-number-editor.component.html',
})
export class JZNumberEditorComponent
  extends JZEditorCommonComponent<number, JZNumberEditorOptions, JZNumberEditorComponent>
  implements OnInit
{
  @Input() zeroIsValid: boolean;

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.zeroIsValid) this.zeroIsValid = options.zeroIsValid;
    }
  }
}
