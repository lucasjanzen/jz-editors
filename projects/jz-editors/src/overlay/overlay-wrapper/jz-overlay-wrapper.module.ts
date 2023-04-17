import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JZOverlayWrapperComponent } from './jz-overlay-wrapper.component';

@NgModule({
  declarations: [JZOverlayWrapperComponent],
  exports: [JZOverlayWrapperComponent],
  imports: [CommonModule],
})
export class JZOverlayWrapperModule {}
