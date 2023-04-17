import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JZValidatorError, JZValidatorRequiredRule, JZValidatorRules, JZValidatorValidateEvent } from './models';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

@Component({
  selector: 'jz-validator',
  templateUrl: './jz-validator.component.html',
})
export class JZValidatorComponent implements OnInit {
  @Input() rules: JZValidatorRules[];

  @Input() get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (val !== undefined) {
      this._value = val;

      if (this._loaded) this.validate();
    }
  }

  @Output() onReady = new EventEmitter<JZValidatorComponent>();
  @Output() onValidate = new EventEmitter<JZValidatorValidateEvent>();

  private _value: any;
  private _errors: JZValidatorError[];
  private _loaded: boolean;

  get errors() {
    return this._errors;
  }

  ngOnInit(): void {
    this._loaded = true;
    this.onReady.emit(this);
  }

  validate() {
    this._errors = [];
    const newErrors: JZValidatorError[] = [];

    this.rules?.forEach(rule => {
      switch (rule.type) {
        case 'email':
          if (this.validateEmail()) {
            newErrors.push({ message: rule.message || 'E-mail inválido', rule });
          }
          break;
        case 'required':
          if (this.validateRequired(rule)) {
            newErrors.push({ message: rule.message || 'Campo obrigatório', rule });
          }
          break;
      }
    });

    this._errors = newErrors;
    const isValid = !!this._errors?.length;
    this.onValidate.emit({ isValid, errors: this._errors });

    return isValid;
  }

  private validateRequired(rule: JZValidatorRequiredRule) {
    return (
      this.value === null || this.value === undefined || this.value === '' || (!rule.zeroIsValid && this.value === 0)
    );
  }

  private validateEmail() {
    return EMAIL_REGEX.test(this.value);
  }
}
