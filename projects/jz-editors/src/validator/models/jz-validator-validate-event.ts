import { JZValidatorError } from './jz-validator-error';

export interface JZValidatorValidateEvent {
  errors?: JZValidatorError[];
  isValid: boolean;
}
