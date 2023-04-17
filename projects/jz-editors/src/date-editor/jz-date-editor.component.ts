import { Component, Input, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZDateEditorOptions, JZDateTypes } from './models';

@Component({
  selector: 'jz-date-editor',
  templateUrl: './jz-date-editor.component.html',
})
export class JZDateEditorComponent
  extends JZEditorCommonComponent<string, JZDateEditorOptions, JZDateEditorComponent>
  implements OnInit
{
  @Input() dateType: JZDateTypes = 'date';

  get dateMode() {
    if (this.dateType === 'datetime') return 'datetime-local';
    return this.dateType || 'date';
  }

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.dateType) this.dateType = options.dateType;
    }
  }
}
