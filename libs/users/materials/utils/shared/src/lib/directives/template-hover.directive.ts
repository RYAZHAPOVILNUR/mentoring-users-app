import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, tap } from 'rxjs';

@Directive({
  selector: '[usersTemplateHover]',
})
export class TemplateHoverDirective implements OnInit {
  @Input({ required: true }) hoverTarget!: ElementRef;
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

    fromEvent(this.hoverTarget.nativeElement, 'mouseleave')
      .pipe(
        tap(() => {
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }),
      )
      .subscribe();
    fromEvent(this.hoverTarget.nativeElement, 'mouseenter')
      .pipe(
        tap(() => {
          this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        }),
      )
      .subscribe();
  }
}
