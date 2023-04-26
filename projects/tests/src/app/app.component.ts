import { Component } from '@angular/core';
import { JZFormComponent, JZFormItem } from 'jz-editors';
import { JZEditorValueChangedEvent } from 'jz-editors/src/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formComponent: JZFormComponent;

  selectDataSource = [
    { id: 1, name: 'Teste' },
    { id: 2, name: 'Teste 2' },
    { id: 3, name: 'Teste 3' },
    { id: 4, name: 'Teste 4' },
  ];

  formData = { nome: 'Lucas', email: 'lucas@gmail.com', select: { id: 1, name: 'Teste' } };

  formItens: JZFormItem[] = [
    {
      type: 'simple',
      fieldName: 'select',
      editorOptions: {
        type: 'select',
        label: 'Select',
        dataSource: this.selectDataSource,
        displayExpr: 'name',
        keyExpr: 'id',
      },
    },
    { type: 'simple', fieldName: 'nome', editorOptions: { type: 'text', required: true, mode: 'text', label: 'Nome' } },
    {
      type: 'simple',
      fieldName: 'email',
      editorOptions: { type: 'text', required: true, mode: 'email', label: 'Email' },
    },
    {
      type: 'simple',
      fieldName: 'data',
      editorOptions: { type: 'date', required: true, label: 'Data' },
    },
    {
      type: 'simple',
      fieldName: 'datatime',
      editorOptions: { type: 'date', dateType: 'datetime', required: true, label: 'Data Time' },
    },
    {
      type: 'simple',
      fieldName: 'boolean',
      editorOptions: { type: 'checkbox', label: 'Checkbox' },
    },
    {
      type: 'simple',
      fieldName: 'senha',
      editorOptions: { type: 'text', required: true, mode: 'password', label: 'Senha' },
    },
    { type: 'simple', fieldName: 'numero', editorOptions: { type: 'number', required: true, label: 'Numero' } },
  ];

  onDataChanged(event: JZEditorValueChangedEvent) {
    console.log('onDataChanged');
    console.log(event);
  }

  onFormReady(component: JZFormComponent) {
    this.formComponent = component;
  }

  validateFields() {
    this.formComponent.validate();
  }
}
