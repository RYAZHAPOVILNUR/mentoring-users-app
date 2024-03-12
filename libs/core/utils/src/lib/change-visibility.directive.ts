import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[changeVisibility]',
  standalone: true,
})
export class ChangeVisibilityDirective implements OnInit {
  @Input({ required: true })
  changeVisibility!: ElementRef<HTMLButtonElement>
  ngOnInit(): void {
    this.changeVisibility.nativeElement.style.display = "none"
  }
  @HostListener("mouseenter")
  onFocus() {
    this.changeVisibility.nativeElement.style.display = "block"
  }

  @HostListener("mouseleave")
  onBlur() {
    this.changeVisibility.nativeElement.style.display = "none"
  }

}
