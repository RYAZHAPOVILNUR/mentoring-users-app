import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[usersOnclick]',
  standalone: true,
})
export class HighlightOnClickDirective {
  @HostBinding('class.highlighted') isHighlighted = false;
  private timeoutId: any;

  @HostListener('click') onClick(): void {
    this.isHighlighted = true;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.isHighlighted = false;
    }, 1000);
  }
}