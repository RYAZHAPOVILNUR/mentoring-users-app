import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'resourceUrlSanitizer', standalone: true })
export class ResourceUrlSanitizer implements PipeTransform {
  private readonly _sanitizer = inject(DomSanitizer);

  transform(value: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
