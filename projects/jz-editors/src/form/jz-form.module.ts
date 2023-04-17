import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZCheckboxEditorModule } from 'jz-editors/src/checkbox-editor';
import { JZDateEditorModule } from 'jz-editors/src/date-editor';
import { JZNumberEditorModule } from 'jz-editors/src/number-editor';
import { JZSelectEditorModule } from 'jz-editors/src/select-editor';
import { JZTextEditorModule } from 'jz-editors/src/text-editor';
import { JZFormComponent } from './jz-form.component';

@NgModule({
  declarations: [JZFormComponent],
  exports: [JZFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    JZTextEditorModule,
    JZNumberEditorModule,
    JZCheckboxEditorModule,
    JZDateEditorModule,
    JZSelectEditorModule,
  ],
})
export class JZFormModule {}
