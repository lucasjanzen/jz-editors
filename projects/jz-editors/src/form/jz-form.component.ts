import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { JZEditorCommonComponent, JZEditorValueChangedEvent } from 'jz-editors/src/shared/models';
import { JZScreenService } from 'jz-editors/src/shared/utils';
import { Subscription } from 'rxjs';
import { FormRowConfig, JZFormDataChangedEvent, JZFormItemSizeConfig } from './models';
import { JZFormItem } from './types';

const FORM_SIZE_DEFAULT: JZFormItemSizeConfig = { sm: 1, md: 12, lg: 36, xl: 48 };

const FORM_EDITORS_SIZE_DEFAULT = {
  number: {
    small: { sm: 1, md: 2, lg: 6, xl: 6 },
    medium: { sm: 1, md: 3, lg: 6, xl: 6 },
    large: { sm: 1, md: 4, lg: 6, xl: 6 },
  },
  text: {
    small: { sm: 1, md: 2, lg: 8, xl: 8 },
    medium: { sm: 1, md: 3, lg: 8, xl: 8 },
    large: { sm: 1, md: 4, lg: 8, xl: 8 },
  },
  date: {
    small: { sm: 1, md: 2, lg: 6, xl: 6 },
    medium: { sm: 1, md: 3, lg: 6, xl: 6 },
    large: { sm: 1, md: 4, lg: 6, xl: 6 },
  },
  datetime: {
    small: { sm: 1, md: 2, lg: 8, xl: 8 },
    medium: { sm: 1, md: 3, lg: 8, xl: 8 },
    large: { sm: 1, md: 4, lg: 8, xl: 8 },
  },
  select: {
    small: { sm: 1, md: 2, lg: 8, xl: 8 },
    medium: { sm: 1, md: 3, lg: 8, xl: 8 },
    large: { sm: 1, md: 4, lg: 8, xl: 8 },
  },
  checkbox: {
    small: { sm: 1, md: 2, lg: 6, xl: 6 },
    medium: { sm: 1, md: 3, lg: 6, xl: 6 },
    large: { sm: 1, md: 4, lg: 6, xl: 6 },
  },
};

@Component({
  selector: 'jz-form',
  templateUrl: './jz-form.component.html',
})
export class JZFormComponent implements AfterViewInit, OnInit, OnDestroy {
  /** List of form fields. */
  @Input() items: JZFormItem[];
  /** Form data. */
  @Input() get data() {
    return this._data;
  }
  set data(val) {
    if (val !== undefined) {
      this._data = val;
      this.dataChange.emit(val);
    }
  }

  /** Executed when the value of the 'data' variable is changed. */
  @Output() dataChange = new EventEmitter<object>();
  /** Executed when the form value is changed. */
  @Output() onDataChanged = new EventEmitter<JZFormDataChangedEvent>();
  /** Executed when the component is ready. */
  @Output() onReady = new EventEmitter<JZFormComponent>();

  /** List of the editors component. */
  private _editorsComponent = new Map<string, JZEditorCommonComponent>();
  /** Controls the form data. */
  private _data: object;
  /** screen changed event subscription. Used to unsubscribe the observable when the component is destroyed. */
  private _screenSubscription: Subscription;

  loaded: boolean;
  rows: FormRowConfig[] = [];

  /** Constructor */
  constructor(private _screenService: JZScreenService, private _changeDetector: ChangeDetectorRef) {
    this._screenSubscription = this._screenService.changed.subscribe(() => this._setItemsSize());
  }

  ngOnInit() {
    this._setItemsSize();
  }

  ngAfterViewInit(): void {
    this.onReady.emit(this);
  }

  ngOnDestroy() {
    this._screenSubscription.unsubscribe();
  }

  onEditorValueChanged(event: JZEditorValueChangedEvent, item: JZFormItem) {
    if (!this._data) this._data = {};

    const oldData = this.data;
    this.data = { ...this.data, [item.fieldName]: event.value };

    this.onDataChanged.emit({ previousValue: oldData, value: this.data });
  }

  onEditorReady(component: JZEditorCommonComponent, fieldName: string) {
    this._editorsComponent.set(fieldName, component);
  }

  setRowSizes(row: FormRowConfig, rowElement: HTMLElement) {
    const maxColumns = this._getQtdColumns(FORM_SIZE_DEFAULT);
    const widthByColumn = rowElement.clientWidth / maxColumns;
    // diminuir o espaço do gap de forma igual para todos os campos
    const gapValue = ((row.columns?.length - 1) * 20) / row.columns?.length;
    let columnsUsed = 0;
    let templateColumns = '';

    row.columns.forEach(column => {
      let columnWidth = widthByColumn * column - gapValue;
      templateColumns += ` ${columnWidth}px`;
      columnsUsed += column;
    });

    if (columnsUsed < maxColumns) {
      templateColumns += ` ${widthByColumn * (maxColumns - columnsUsed)}px`;
    }

    rowElement.style.gridTemplateColumns = templateColumns;
  }

  validate() {
    this._editorsComponent?.forEach(editor => editor.validate());
  }

  getFieldValue(fieldName: string) {
    const value = Object.getOwnPropertyDescriptor(this._data, fieldName)?.value;
    return value || null;
  }

  private _setItemsSize() {
    this.rows = [];

    const maxColumns = this._getQtdColumns(FORM_SIZE_DEFAULT);
    let totalColumns = 0;
    let itemsList: JZFormItem[] = [];
    let rowColumns: number[] = [];

    this.items?.forEach(item => {
      const itemSize = this._getItemSize(item);
      const nextTotal = totalColumns + itemSize;

      if (nextTotal > maxColumns) {
        this.rows.push({ items: itemsList, columns: rowColumns });
        itemsList = [];
        totalColumns = itemSize;
        rowColumns = [];
      } else {
        totalColumns = nextTotal;
      }

      rowColumns.push(itemSize);
      itemsList.push(item);
    });

    this.rows.push({ items: itemsList, columns: rowColumns });
    this._changeDetector.detectChanges();
  }

  private _getQtdColumns(config: JZFormItemSizeConfig) {
    const screenSize = this._screenService.currentSize;

    switch (screenSize) {
      case 'small':
        return config.sm;
      case 'medium':
        return config.md;
      case 'large':
        return config.lg;
      default:
        // x-large
        return config.xl;
    }
  }

  private _getItemSize(item: JZFormItem) {
    let sizeConfig: JZFormItemSizeConfig;

    if (!item.sizeConfig) {
      const itemSize = item.size || 'medium';

      sizeConfig = FORM_EDITORS_SIZE_DEFAULT[item.editorOptions.type][itemSize];

      if (item.editorOptions.type === 'date' && item.editorOptions.dateType === 'datetime') {
        sizeConfig = FORM_EDITORS_SIZE_DEFAULT.datetime[itemSize];
      }
    } else {
      sizeConfig = item.sizeConfig;
    }

    return this._getQtdColumns(sizeConfig);
  }
}
