import { JZValidatorRules } from './jz-validator-rules';

export interface JZValidatorError {
  message: string;
  rule: JZValidatorRules;
}
