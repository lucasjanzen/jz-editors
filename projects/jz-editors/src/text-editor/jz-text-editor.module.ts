import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZLabelModule } from 'jz-editors/src/label';
import { JZValidatorModule } from 'jz-editors/src/validator';
import { JZTextEditorComponent } from './jz-text-editor.component';

@NgModule({
  declarations: [JZTextEditorComponent],
  exports: [JZTextEditorComponent],
  imports: [CommonModule, FormsModule, JZLabelModule, JZValidatorModule],
})
export class JZTextEditorModule {}
