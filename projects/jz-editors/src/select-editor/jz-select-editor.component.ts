import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JZEditorCommonComponent } from 'jz-editors/src/shared/models';
import { JZSelectEditorOptions } from './models';

const DROPDOWN_OPENED_CSS_CLASS = 'opened';

@Component({
  selector: 'jz-select-editor',
  templateUrl: './jz-select-editor.component.html',
})
export class JZSelectEditorComponent
  extends JZEditorCommonComponent<object, JZSelectEditorOptions, JZSelectEditorComponent>
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild('SelectedElement') private _selectedElement: ElementRef<HTMLElement>;
  @ViewChild('ContainerElement') private _containerElement: ElementRef<HTMLElement>;

  /** Campo do registro que deve ser utilizado como código único. */
  @Input() keyExpr: string;
  /** Campo do registro que deve ser utilizado na exibição do valor.  */
  @Input() displayExpr: string;
  /** Especifica se deve ser exibido o botão 'limpar'. Padrão é 'false' quando 'required:true', se não é 'true'. */
  @Input() showClearButton: boolean;
  /** Lista de registros disponíveis para seleção. */
  @Input() dataSource: object[];

  listAlreadyOpened: boolean;
  private _dropdownOpened: boolean;

  ngOnDestroy() {
    document.removeEventListener('click', this._documentClick.bind(this));
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    document.addEventListener('click', this._documentClick.bind(this));
  }

  override controlInvalidStyle() {
    super.controlInvalidStyle(this._selectedElement?.nativeElement);
  }

  onToggleDropdown(type?: 'close' | 'open') {
    this.listAlreadyOpened = true;

    const { classList } = this._containerElement.nativeElement;
    const alreadyOpened = classList.contains(DROPDOWN_OPENED_CSS_CLASS);

    if (type === 'close' || alreadyOpened) {
      this._dropdownOpened = false;
      classList.remove(DROPDOWN_OPENED_CSS_CLASS);
    } else if (type === 'open' || !alreadyOpened) {
      this._dropdownOpened = true;
      classList.add(DROPDOWN_OPENED_CSS_CLASS);
    }
  }

  onSelectItem(value: object) {
    this.value = value;
    this.onToggleDropdown('close');
  }

  getValueText(value = this.value) {
    return value ? Object.getOwnPropertyDescriptor(value, this.displayExpr)?.value || '' : '';
  }

  isSelected(value: object) {
    if (!this.value) return false;

    const selectedKey = Object.getOwnPropertyDescriptor(this.value, this.keyExpr)?.value;
    const key = Object.getOwnPropertyDescriptor(value, this.keyExpr)?.value;

    return selectedKey === key;
  }

  private _documentClick(event: MouseEvent) {
    if (this._dropdownOpened) {
      const isDropdown = !!(event.composedPath() as HTMLElement[]).find(item =>
        item?.classList?.contains('jz-select-editor-container')
      );

      if (!isDropdown) this.onToggleDropdown('close');
    }
  }

  protected override setOptions() {
    super.setOptions();
    const options = this.options;

    if (options) {
      if (options.keyExpr) this.keyExpr = options.keyExpr;
      if (options.displayExpr) this.displayExpr = options.displayExpr;
      if (options.dataSource) this.dataSource = options.dataSource;
      if (options.showClearButton === false || options.showClearButton === true) {
        this.showClearButton = options.showClearButton;
      }
    }

    if (this.showClearButton === undefined) this.showClearButton = !this.required;
  }
}
