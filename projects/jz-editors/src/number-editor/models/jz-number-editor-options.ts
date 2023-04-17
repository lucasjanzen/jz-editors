import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

export interface JZNumberEditorOptions extends JZEditorCommonOptions {
  value?: number;
  zeroIsValid?: boolean;
  type: 'number';
}
