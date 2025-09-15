import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import BlotFormatter from '@enzedonline/quill-blot-formatter2';
import { TranslateModule } from '@ngx-translate/core';
import { CreateArticle } from '@users/articles/data-access-article';
import { Article } from '@users/shared/data-access-models';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
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
export class ArticlesCreateUiComponent {
  private _vm!: ArticlesCreateVm;
  private readonly router = inject(Router);

  public formGroup = new FormGroup({
    textEditor: new FormControl('', {
      validators: [
        Validators.required,
        (control) => {
          const pattern = control.value.replace(/<[^>]*>/g, '');
          return pattern.length > 66 ? null : { minLength: 'min length must be > 60 symbols' };
        },
      ],
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(66)],
    }),
  });

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

  @Output() addArticle = new EventEmitter<CreateArticle>();
  @Output() updateArticle = new EventEmitter<CreateArticle>();

  @Input({ required: true }) set vm(value: ArticlesCreateVm) {
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
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const article: CreateArticle = {
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
