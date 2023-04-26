import { Component, OnInit } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZCheckboxEditorOptions } from './models';

@Component({
  selector: 'jz-checkbox-editor',
  templateUrl: './jz-checkbox-editor.component.html',
})
export class JZCheckboxEditorComponent
  extends JZEditorCommonComponent<string, JZCheckboxEditorOptions, JZCheckboxEditorComponent>
  implements OnInit
{
  /** Constructor */
  constructor() {
    super();
    this.disableFocusEvents = true;
  }
}
