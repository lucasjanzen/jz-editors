import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

export interface JZCheckboxEditorOptions extends JZEditorCommonOptions {
  value?: boolean;
  type: 'checkbox';
}
