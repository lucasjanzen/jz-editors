import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JZOverlayComponent } from './jz-overlay.component';

@NgModule({
  declarations: [JZOverlayComponent],
  exports: [JZOverlayComponent],
  imports: [CommonModule],
})
export class JZOverlayModule {}
