export type JZValidatorRules = JZValidatorRequiredRule | JZValidatorEmailRule;

export interface JZValidatorRequiredRule {
  message?: string;
  zeroIsValid?: boolean;
  type: 'required';
}

export interface JZValidatorEmailRule {
  message?: string;
  type: 'email';
}
