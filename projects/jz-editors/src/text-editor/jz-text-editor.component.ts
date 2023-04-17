import { Component, Input, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
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

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.mode) this.mode = options.mode;
    }
  }
}
