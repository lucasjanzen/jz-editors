import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JZLabelComponent } from './jz-label.component';

@NgModule({
  declarations: [JZLabelComponent],
  exports: [JZLabelComponent],
  imports: [CommonModule],
})
export class JZLabelModule {}
