import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'users-ui-photo-modal',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ui-photo-modal.component.html',
  styleUrls: ['./ui-photo-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPhotoModalComponent implements OnInit {
  public photo = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    console.log('photo', this.photo);
  }
}
