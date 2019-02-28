import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss']
})
export class SplitComponent {
  @Input() title = '';
  @Input() noMarginTop = false;
}
