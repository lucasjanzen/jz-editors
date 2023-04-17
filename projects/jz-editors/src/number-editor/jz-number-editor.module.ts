import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JZLabelModule } from 'jz-editors/src/label';
import { JZValidatorModule } from 'jz-editors/src/validator';
import { JZNumberEditorComponent } from './jz-number-editor.component';

@NgModule({
  declarations: [JZNumberEditorComponent],
  exports: [JZNumberEditorComponent],
  imports: [CommonModule, FormsModule, JZLabelModule, JZValidatorModule],
})
export class JZNumberEditorModule {}
