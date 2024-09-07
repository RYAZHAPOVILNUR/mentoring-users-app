import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[usersDoubleClick]',
  host: {
    '(dblclick)': 'onDoubleClick($event)',
  },
})
export class DoubleClickActionDirective {
  @Output() public readonly usersDoubleClick = new EventEmitter<MouseEvent>();

  public onDoubleClick(event: MouseEvent) {
    event.preventDefault();
    this.usersDoubleClick.emit(event);
  }
}
