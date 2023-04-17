import { JZFormEditors } from '../types';

export interface JZFormSimpleItem {
  fieldName: string;
  editorOptions: JZFormEditors;
  type: 'simple';
}
