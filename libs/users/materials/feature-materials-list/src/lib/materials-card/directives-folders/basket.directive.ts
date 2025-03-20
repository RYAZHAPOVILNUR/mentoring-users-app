import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[usersBasket]',
  standalone: true,
})
export class BasketDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setVisibility(false);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setVisibility(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setVisibility(false);
  }

  private setVisibility(visible: boolean) {
    const button = this.el.nativeElement.querySelector('.button-folders-card');
    if (button) {
      this.renderer.setStyle(button, 'opacity', visible ? '1' : '0');
      this.renderer.setStyle(button, 'pointer-events', visible ? 'auto' : 'none');
    }
  }
}
