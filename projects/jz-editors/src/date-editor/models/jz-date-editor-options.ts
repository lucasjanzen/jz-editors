import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

export type JZDateTypes = 'date' | 'datetime' | 'time';

export interface JZDateEditorOptions extends JZEditorCommonOptions {
  value?: boolean;
  /** Padrão é 'date'. */
  dateType?: JZDateTypes;
  type: 'date';
}
