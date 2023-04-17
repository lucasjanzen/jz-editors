import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZLabelModule } from 'jz-editors/src/label';
import { JZValidatorModule } from 'jz-editors/src/validator';
import { JZDateEditorComponent } from './jz-date-editor.component';

@NgModule({
  declarations: [JZDateEditorComponent],
  exports: [JZDateEditorComponent],
  imports: [CommonModule, FormsModule, JZLabelModule, JZValidatorModule],
})
export class JZDateEditorModule {}
