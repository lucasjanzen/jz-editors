import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { JZEditorCommonComponent, JZEditorValueChangedEvent } from 'jz-editors/src/shared/models';
import { JZScreenService } from 'jz-editors/src/shared/utils';
import { Subscription } from 'rxjs';
import { JZFormDataChangedEvent, JZFormItemSizeConfig } from './models';
import { JZFormItem } from './types';

const FORM_COLUMNS_DEFAULT: JZFormItemSizeConfig = { sm: 1, md: 12, lg: 12, xl: 12 };
const SIZE_SMALL = 2;
const SIZE_MEDIUM = 3;
const SIZE_LARGER = 5;

const FORM_EDITORS_SIZE_DEFAULT = {
  number: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
  text: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
  date: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
  datetime: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
  select: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
  checkbox: {
    small: { sm: 1, md: 2, lg: 3, xl: 3 },
    medium: { sm: 1, md: 3, lg: 4, xl: 4 },
    large: { sm: 1, md: 4, lg: 5, xl: 5 },
  },
};

interface JZFormRowConfig {
  columns: number[];
  items: JZFormItem[];
}

@Component({
  selector: 'jz-form',
  templateUrl: './jz-form.component.html',
})
export class JZFormComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('Form') private _formElement: ElementRef<HTMLElement>;

  @Input() items: JZFormItem[];
  @Input() get data() {
    return this._data;
  }
  set data(val) {
    if (val !== undefined) {
      this._data = val;
      this.dataChange.emit(val);
    }
  }

  @Output() dataChange = new EventEmitter<object>();
  @Output() onDataChanged = new EventEmitter<JZFormDataChangedEvent>();
  @Output() onReady = new EventEmitter<JZFormComponent>();

  private _editorsComponent = new Map<string, JZEditorCommonComponent>();
  private _data: object;
  private _fieldSizes = new Map<string, JZEditorCommonComponent>();
  private _screenSubscription: Subscription;

  loaded: boolean;
  rows: JZFormRowConfig[] = [];

  constructor(private _screenService: JZScreenService) {
    this._screenSubscription = this._screenService.changed.subscribe();
  }

  ngOnInit() {
    const maxColumns = this._getQtdColumns(FORM_COLUMNS_DEFAULT);
    console.log(maxColumns);

    let rowColumns = 0;
    let rowItems: JZFormItem[] = [];
    let rowTemplateColumns: number[] = [];

    this.items.forEach(item => {
      const itemColumn = this._getItemSize(item);
      const nextRowColumns = rowColumns + itemColumn;

      console.log(itemColumn);
      console.log(nextRowColumns);
      console.log(maxColumns);

      if (nextRowColumns > maxColumns) {
        // if (nextRowColumns < maxColumns) {
        //   console.log(maxColumns - nextRowColumns);

        //   rowTemplateColumns.push(maxColumns - nextRowColumns);
        // }

        this.rows.push({ items: rowItems, columns: rowTemplateColumns });
        rowItems = [];
        rowColumns = itemColumn;
        rowTemplateColumns = [];
      } else {
        rowColumns = nextRowColumns;
      }

      rowTemplateColumns.push(itemColumn);
      rowItems.push(item);
    });

    console.log(rowColumns);
    console.log(rowTemplateColumns);

    // if (rowColumns < maxColumns) {
    //   rowTemplateColumns.push(maxColumns - rowColumns);
    // }
    this.rows.push({ items: rowItems, columns: rowTemplateColumns });

    console.log(this.rows);

    this.onReady.emit(this);
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
        //x-large
        return config.xl;
    }
  }

  private _getItemSize(item: JZFormItem) {
    if (item.size) {
      if (item.editorOptions.type === 'date' && item.editorOptions.dateType === 'datetime') {
        return this._getQtdColumns(FORM_EDITORS_SIZE_DEFAULT.datetime[item.size]);
      } else {
        return this._getQtdColumns(FORM_EDITORS_SIZE_DEFAULT[item.editorOptions.type][item.size]);
      }
    }

    if (item.sizeConfig) return this._getQtdColumns(item.sizeConfig);

    return this._getQtdColumns(FORM_EDITORS_SIZE_DEFAULT[item.editorOptions.type].medium);
  }

  ngAfterViewInit(): void {}

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

  validate() {
    this._editorsComponent?.forEach(editor => editor.validate());
  }

  getFieldValue(fieldName: string) {
    const value = Object.getOwnPropertyDescriptor(this._data, fieldName)?.value;
    return value || null;
  }

  setRowSizes(row: JZFormRowConfig, rowElement: HTMLElement) {
    console.log('setRowSizes');
    console.log(rowElement);

    const maxColumns = this._getQtdColumns(FORM_COLUMNS_DEFAULT);
    const widthByColumn = rowElement.clientWidth / this._getQtdColumns(FORM_COLUMNS_DEFAULT);
    console.log(widthByColumn);

    let columnsUsed = 0;

    let templateColumns = '';

    row.columns.forEach(column => {
      console.log(widthByColumn * column);

      let columnWidth = widthByColumn * column;
      if (columnsUsed !== 0) columnWidth -= 20;

      templateColumns += ` ${columnWidth}px`;
      columnsUsed += column;
    });

    if (columnsUsed < maxColumns) {
      templateColumns += ` ${widthByColumn * (maxColumns - columnsUsed)}px`;
    }

    console.log(templateColumns);

    rowElement.style.gridTemplateColumns = templateColumns;
  }
}
