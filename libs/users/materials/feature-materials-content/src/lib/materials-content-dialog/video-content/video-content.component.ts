import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity } from '@users/users/materials/data-access';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-video-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-content.component.html',
  styleUrls: ['./video-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoContentComponent implements OnInit {
  @Input({required: true})
  material!: MaterialsEntity

  private readonly _sanitizer = inject(DomSanitizer)
  public videoUrl: SafeResourceUrl = '';
  
  ngOnInit(): void {
    this.videoUrl = this._sanitizer
      .bypassSecurityTrustResourceUrl(this.material.materialLink);
  }
}
