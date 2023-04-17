import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JZEditorCommonComponent, JZEditorValueChangedEvent } from 'jz-editors/src/shared/models';
import { JZFormDataChangedEvent } from './models';
import { JZFormItem } from './types';

@Component({
  selector: 'jz-form',
  templateUrl: './jz-form.component.html',
})
export class JZFormComponent {
  @Input() items: JZFormItem[];
  @Input() get data() {
    return this._data;
  }
  set data(val) {
    if (val !== undefined) {
      this._data = val;
      this.dataChange.emit(val);
    }
  }

  @Output() dataChange = new EventEmitter<object>();
  @Output() onDataChanged = new EventEmitter<JZFormDataChangedEvent>();

  private _editorsComponent = new Map<string, JZEditorCommonComponent>();
  private _data: object;

  onEditorValueChanged(event: JZEditorValueChangedEvent, item: JZFormItem) {
    if (!this._data) this._data = {};

    const oldData = this.data;
    this.data = { ...this.data, [item.fieldName]: event.value };

    this.onDataChanged.emit({ previousValue: oldData, value: this.data });
  }

  onEditorReady(component: JZEditorCommonComponent, fieldName: string) {
    this._editorsComponent.set(fieldName, component);
  }

  validate() {
    this._editorsComponent?.forEach(editor => editor.validate());
  }

  getFieldValue(fieldName: string) {
    const value = Object.getOwnPropertyDescriptor(this._data, fieldName)?.value;
    return value || null;
  }
}
