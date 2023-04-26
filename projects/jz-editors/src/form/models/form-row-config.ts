import { JZFormItem } from '../types';

/** Esta classe é utilizada para use interno do componente JZForm */
export interface FormRowConfig {
  /** Quantidade de colunas do layout que cada item irá ocupar na mesma ordem dos items. */
  columns: number[];
  /** Items do formulário. */
  items: JZFormItem[];
}
