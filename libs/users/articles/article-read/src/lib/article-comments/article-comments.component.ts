import { ChangeDetectionStrategy, Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../data-access/src';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '../../../../../../core/data-access/src';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: 'article-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent implements OnInit{
  @Input() comments!: Comment[];
  @Input() status!: LoadingStatus;
  @Output() submitComment = new EventEmitter<string>();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);


  public formGroup = new FormGroup({
    commentText: new FormControl('', [Validators.maxLength(100)])
  })


  ngOnInit(): void {
    // this.route.params.subscribe(
    //   params => {
    //     console.log(params)
    //   })
  }


  onSubmitComment() {
    if(this.formGroup.valid && this.formGroup.value.commentText) {
      this.submitComment.emit(
        this.formGroup.value.commentText
      )
      this.formGroup.reset()
      return;
    }
    return;
  }



}
