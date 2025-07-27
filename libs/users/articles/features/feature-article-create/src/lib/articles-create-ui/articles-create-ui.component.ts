import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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

import { ArticlesFacade, CreateArticle } from '@users/articles/data-access-article';
import { Article } from '@users/shared/data-access-models';

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
  templateUrl: './articles-create-ui.component.html',
  styleUrls: ['./articles-create-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesCreateUiComponent {
  private _vm!: ArticlesCreateVm;
  private readonly router = inject(Router);
  private readonly articleFacade = inject(ArticlesFacade);

  public formGroup = new FormGroup({
    textEditor: new FormControl('', {
      validators: [Validators.required, this.validateWithClearTegs()],
    }),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(66)],
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
  @Output() publishArticle = new EventEmitter<CreateArticle>();

  @Output() formChange = new EventEmitter<boolean>();

  constructor() {
    this.checkChanges();
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
        textEditor: this.vm.editingArticle?.content || '',
        title: this.vm.editingArticle?.title || '',
      });
    } else if (!this._vm.editMode) {
      this.formGroup.patchValue({
        textEditor: '',
        title: '',
      });
    }
  }

  public onSubmit() {
    // event.preventDefault();
    this.formSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const article: CreateArticle = {
        title: this.formGroup.value.title as string,
        content: this.formGroup.value.textEditor as string,
      };
      this.publishArticle.emit(article);
      if (this.vm.editMode) {
        this.formChange.emit(false);
        this.articleFacade.editArticle(article, this.vm.editingArticle!.id);
      } else {
        this.router.navigate(['/articles']);
      }
      console.log(article);
    }
  }

  public onCancel() {
    const containsUnsavedChanges = this.containsUnsavedChanges();
    if (containsUnsavedChanges) {
      this.formChange.emit(true);
      this.router.navigate(['/articles']);
      return;
    }

    const article: CreateArticle = {
      title: this.formGroup.value.title as string,
      content: this.formGroup.value.textEditor as string,
    };

    this.publishArticle.emit({
      ...article,
      articlesId: this.vm.editingArticle?.id,
    });
    this.router.navigate(['/articles']);
  }

  private validateWithClearTegs(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const content = control.value.replace(/<[^>]*>/g, ''); // clear tegs

      if (content.length > 66) return null;
      return { minLength: 'min length must be < 60 symbols' };
    };
  }

  private checkChanges() {
    this.formGroup.valueChanges.subscribe(() => {
      this.formChange.emit(this.containsUnsavedChanges());
    });
  }

  private containsUnsavedChanges() {
    const initialFormValues = this.vm.editMode
      ? {
          textEditor: this.vm.editingArticle?.content,
          title: this.vm.editingArticle?.title,
        }
      : { textEditor: '', title: '' };

    return JSON.stringify(this.formGroup.value) !== JSON.stringify(initialFormValues);
  }
}
