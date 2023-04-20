import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

/** Tipo de dadas disponíveis. */
export type JZDateTypes = 'date' | 'datetime' | 'time';

export interface JZDateEditorOptions extends JZEditorCommonOptions {
  /** Tipo de data o campo deve solicitar. Padrão é 'date'. */
  dateType?: JZDateTypes;

  value?: boolean;
  type: 'date';
}
