import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormUiVm } from './profile-form-ui-vm';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-form-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule
  ],
  templateUrl: './profile-form-ui.component.html',
  styleUrls: ['./profile-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormUiComponent implements OnInit {
  @Input({ required: true }) vm!: ProfileFormUiVm

  public photo: any

  ngOnInit(): void {
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : ''
  }



}
