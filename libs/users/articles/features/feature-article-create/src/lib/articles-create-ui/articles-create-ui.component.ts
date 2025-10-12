import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Subscription } from 'rxjs';

import { ArticleVM } from '@users/articles/data-access-article';
import { Article } from '@users/shared/data-access-models';

import { ArticleValidators } from '../validators/article-validators';

type ArticlesCreateVm = {
  editMode: boolean;
  editingArticle: Article | null;
};

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted && control.touched);
  }
}

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'users-articles-create-ui',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }],
  templateUrl: './articles-create-ui.component.html',
  styleUrls: ['./articles-create-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateUiComponent implements OnInit, OnDestroy {
  private _vm!: ArticlesCreateVm;
  private readonly router = inject(Router);
  private subscriptions = new Subscription();
  public readonly fieldErrors: Record<string, boolean> = {};

  public formGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, ArticleValidators.validateTitle],
    }),
    textEditor: new FormControl('', {
      validators: [Validators.required, ArticleValidators.validateContent],
    }),
  });
  public formSubmitted = false;
  public matcher = new MyErrorStateMatcher();
  public quillEditorModules = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
    ],
    blotFormatter: {},
  };
  @Output() addArticle = new EventEmitter<ArticleVM>();
  @Output() updateArticle = new EventEmitter<ArticleVM>();

  ngOnInit(): void {
    Object.keys(this.formGroup?.controls).forEach((controlName) => {
      const sub = this.formGroup.get(controlName)?.valueChanges.subscribe(() => {
        this.fieldErrors[controlName] = false;
      });

      if (sub) {
        this.subscriptions.add(sub);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @Input({ required: true })
  set vm(value: ArticlesCreateVm) {
    this._vm = value;
    this.patchFormValues();
  }

  get vm() {
    return this._vm;
  }

  public patchFormValues() {
    if (this._vm.editMode && !this.formGroup.dirty) {
      this.formGroup.patchValue({
        textEditor: this.vm.editingArticle?.content,
        title: this.vm.editingArticle?.title,
      });
    } else if (!this._vm.editMode) {
      this.formGroup.patchValue({
        textEditor: '',
        title: '',
      });
    }
  }

  public onSubmit() {
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      if (this.formGroup.get(controlName)?.invalid) {
        this.fieldErrors[controlName] = true;
      }
    });

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const article: ArticleVM = {
      title: this.formGroup.value.title as string,
      content: this.formGroup.value.textEditor as string,
    };
    if (this.vm.editMode) {
      this.updateArticle.emit(article);
    } else {
      this.addArticle.emit(article);
    }
    this.formGroup.markAsPristine();
    this.router.navigate(['/articles']);
  }

  public onCancel() {
    this.router.navigate(['/articles']);
  }
}
