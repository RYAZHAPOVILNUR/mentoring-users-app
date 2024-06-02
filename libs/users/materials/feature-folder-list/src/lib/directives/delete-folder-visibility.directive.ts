import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[usersDeleteFolderVision]',
})
export class DeleteFolderVisibilityDirective {
  private isHidden = true;
  @HostBinding('class')
  public get deleteButtonCssClass(): { [key: string]: boolean } {
    return {
      'folder-delete-visibility': this.isHidden,
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
