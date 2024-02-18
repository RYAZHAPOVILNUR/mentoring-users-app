import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer',
  standalone: true,
})
export class SanitizerPipe implements PipeTransform {
  private domSanitizer: DomSanitizer = inject(DomSanitizer);
  transform(value: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
