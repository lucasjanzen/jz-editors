import { JZEditorCommonOptions } from 'jz-editors/src/shared/models';

export interface JZSelectEditorOptions extends JZEditorCommonOptions {
  keyExpr: string;
  displayExpr: string;
  dataSource: object[];
  showClearButton?: boolean;

  value?: object;
  type: 'select';
}
