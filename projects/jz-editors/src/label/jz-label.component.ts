import { Component, Input } from '@angular/core';

@Component({
  selector: 'jz-label',
  templateUrl: './jz-label.component.html',
})
export class JZLabelComponent {
  @Input() text: string;
  @Input() required: boolean;
}
