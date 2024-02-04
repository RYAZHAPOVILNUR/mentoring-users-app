import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialsContentService {

  public readonly apiLoaded = signal(false)
  constructor() {
    if (!this.apiLoaded()) {
      const tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag)
      this.apiLoaded.set(true)
    }
  }
}
