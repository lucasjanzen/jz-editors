import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZLabelModule } from 'jz-editors/src/label';
import { JZValidatorModule } from 'jz-editors/src/validator';
import { JZCheckboxEditorComponent } from './jz-checkbox-editor.component';

@NgModule({
  declarations: [JZCheckboxEditorComponent],
  exports: [JZCheckboxEditorComponent],
  imports: [CommonModule, FormsModule, JZLabelModule, JZValidatorModule],
})
export class JZCheckboxEditorModule {}
