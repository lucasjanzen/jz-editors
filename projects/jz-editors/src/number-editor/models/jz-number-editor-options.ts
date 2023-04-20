import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

export interface JZNumberEditorOptions extends JZEditorCommonOptions {
  /** Especifica se o valor zero (0) deve ser considerado válido. Padrão é 'false'. */
  zeroIsValid?: boolean;

  value?: number;
  type: 'number';
}
