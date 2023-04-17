import { JZCheckboxEditorOptions } from 'jz-editors/src/checkbox-editor';
import { JZDateEditorOptions } from 'jz-editors/src/date-editor';
import { JZNumberEditorOptions } from 'jz-editors/src/number-editor';
import { JZSelectEditorOptions } from 'jz-editors/src/select-editor';
import { JZTextEditorOptions } from 'jz-editors/src/text-editor';
import { JZFormSimpleItem } from '../models';

export type JZFormItem = JZFormSimpleItem;
export type JZFormEditors =
  | JZTextEditorOptions
  | JZNumberEditorOptions
  | JZCheckboxEditorOptions
  | JZDateEditorOptions
  | JZSelectEditorOptions;
