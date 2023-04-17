import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZLabelModule } from 'jz-editors/src/label';
import { JZValidatorModule } from 'jz-editors/src/validator';
import { JZSelectEditorComponent } from './jz-select-editor.component';

@NgModule({
  declarations: [JZSelectEditorComponent],
  exports: [JZSelectEditorComponent],
  imports: [CommonModule, FormsModule, JZLabelModule, JZValidatorModule],
})
export class JZSelectEditorModule {}
