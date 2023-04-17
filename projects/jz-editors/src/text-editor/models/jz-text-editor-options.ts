import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';
import { JZTextEditorModes } from '../types';

export interface JZTextEditorOptions extends JZEditorCommonOptions {
  value?: string;
  mode?: JZTextEditorModes;
  type: 'text';
}
