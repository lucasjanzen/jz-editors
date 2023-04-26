/* eslint-disable @angular-eslint/component-class-suffix */
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { JZHelper } from 'jz-editors/src/shared/utils';
import {
  JZValidatorComponent,
  JZValidatorRequiredRule,
  JZValidatorRules,
  JZValidatorValidateEvent,
} from 'jz-editors/src/validator';
import { JZEditorCommonOptions } from './jz-editor-common-options';
import { JZEditorValueChangedEvent } from './jz-editor-value-changed-event';

@Component({ template: '' })
export class JZEditorCommonComponent<ValueType = any, OptionsType = any, ComponentType = any>
  implements AfterViewInit, OnInit
{
  @ViewChild('InputElement') protected inputElement: ElementRef<HTMLElement>;

  @Input() changeValueType: 'default' | 'onkeyup' = 'default';
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() validationRules: JZValidatorRules[];

  @Input() get options() {
    return this._options;
  }
  set options(val) {
    if (val !== undefined) {
      this._options = val;
      this.setOptions();
    }
  }

  @Input() get value(): ValueType {
    return this.internalValue;
  }
  set value(val: ValueType) {
    if (!JZHelper.isEqual(this._valueControl, val) || !JZHelper.isEqual(this._valueControl, this.internalValue)) {
      const oldValue = this._valueControl;
      this._valueControl = val;

      if (this.changeValueType === 'onkeyup' || (this.changeValueType === 'default' && !this.focused)) {
        this.internalValue = val;
        this.valueChange.emit(val);

        if (this.loaded) {
          this.onValueChanged.emit({ previousValue: oldValue, value: this.internalValue });
        }
      }
    }
  }

  @Output() valueChange = new EventEmitter<ValueType>();
  @Output() onValueChanged = new EventEmitter<JZEditorValueChangedEvent<ValueType>>();
  @Output() onReady = new EventEmitter<ComponentType>();

  protected loaded = false;
  protected isValid: boolean = true;
  protected internalValue: ValueType;
  protected validatorComponent: JZValidatorComponent;
  protected focused: boolean;
  protected disableFocusEvents: boolean;
  private _options: OptionsType;
  private _valueControl: ValueType;

  ngOnInit() {
    this.execOnInit();
  }

  ngAfterViewInit() {
    this.controlInvalidStyle();

    if (this.inputElement?.nativeElement && !this.disableFocusEvents) {
      this.inputElement.nativeElement.addEventListener('focusin', this.onFocusIn.bind(this));
      this.inputElement.nativeElement.addEventListener('focusout', this.onFocusOut.bind(this));
    }

    this.onReady.emit(this as any);
  }

  protected execOnInit() {
    if (this.required) {
      const hasRule = this.validationRules?.find(item => item.type === 'required');

      if (!hasRule) {
        const requiredRule: JZValidatorRequiredRule = { type: 'required' };
        this.validationRules?.length
          ? this.validationRules.push(requiredRule)
          : (this.validationRules = [requiredRule]);
      }
    }

    this.loaded = true;
  }

  onFocusIn() {
    this.focused = true;
    this.controlFocusedStyle();
  }

  onFocusOut() {
    this.focused = false;
    this.controlFocusedStyle();

    if (!JZHelper.isEqual(this._valueControl, this.internalValue)) {
      this.value = this._valueControl;
    }
  }

  onValidatorReady(component: JZValidatorComponent) {
    this.validatorComponent = component;
  }

  onValidate(event: JZValidatorValidateEvent) {
    this.isValid = event.isValid;
    this.controlInvalidStyle();
  }

  async validate() {
    return this.validatorComponent.validate();
  }

  reset() {
    this.value = null;
  }

  protected controlInvalidStyle(element: HTMLElement = this.inputElement?.nativeElement) {
    if (element) {
      this.isValid ? element.classList.remove('jz-invalid') : element.classList.add('jz-invalid');
    }
  }

  protected controlFocusedStyle(element: HTMLElement = this.inputElement?.nativeElement) {
    if (element) {
      this.focused ? element.classList.add('jz-focused') : element.classList.remove('jz-focused');
    }
  }

  protected setOptions() {
    const options = this.options as JZEditorCommonOptions;
    if (options) {
      if (options.disabled === false || options.disabled === true) this.disabled = options.disabled;
      if (options.required === false || options.required === true) this.required = options.required;
      if (options.label) this.label = options.label;
      if (options.name) this.name = options.name;
    }
  }
}
