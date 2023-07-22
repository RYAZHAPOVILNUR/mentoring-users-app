import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuillModule} from "ngx-quill";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'users-articles-view',
  standalone: true,
  imports: [CommonModule, QuillModule, MatCardModule],
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesViewComponent {
  @Input({ required: true }) articles!: any
}
