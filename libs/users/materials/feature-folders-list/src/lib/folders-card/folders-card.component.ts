import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '../..';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent implements OnInit {
  @Input({ required: true }) folder!: FoldersVM;

  ngOnInit(): void {
    console.log(this.folder);
    // console.log(this.folders$.subscribe((state) => this.getValue(state)))
  }
}
