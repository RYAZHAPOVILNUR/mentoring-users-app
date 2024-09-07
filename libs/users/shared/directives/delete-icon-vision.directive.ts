import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[usersDeleteIconVision]',
})
export class DeleteIconVisionDirective {
  private isHidden = true;
  @HostBinding('class')
  public get deleteButtonClass(): { [key: string]: boolean } {
    return {
      'delete-button-visibility': this.isHidden,
    };
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHidden = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHidden = true;
  }
}
