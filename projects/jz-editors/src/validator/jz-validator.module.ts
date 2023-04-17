import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JZValidatorComponent } from './jz-validator.component';

@NgModule({
  declarations: [JZValidatorComponent],
  exports: [JZValidatorComponent],
  imports: [CommonModule],
})
export class JZValidatorModule {}
