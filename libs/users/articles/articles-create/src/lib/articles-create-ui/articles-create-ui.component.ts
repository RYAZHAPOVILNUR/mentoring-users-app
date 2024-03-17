import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ArticlesFacade, CreateArticle } from '@users/users/articles/data-access';
import { ArticlesCreateVm } from './articles-create-vm';
import { TranslateModule } from '@ngx-translate/core';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted && control.touched);
  }
}

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'articles-create-ui',
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
  public _vm!: ArticlesCreateVm;
  private readonly articleFacade = inject(ArticlesFacade);

  @Input({ required: true })
  set vm(value: ArticlesCreateVm) {
    this._vm = value;
    this.patchFormValues();
  }

  get vm() {
    return this._vm;
  }

  @Output() publishArticle = new EventEmitter<CreateArticle>();
  @Output() formChange = new EventEmitter<boolean>();

  public formGroup = new FormGroup({
    textEditor: new FormControl('', {
      validators: [Validators.required, Validators.minLength(66)],
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

  constructor() {
    this.checkChanges();
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

  public onSubmit(event: Event) {
    // event.preventDefault();
    this.formSubmitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const article: CreateArticle = {
        title: this.formGroup.value.title as string,
        content: this.formGroup.value.textEditor as string,
      };
      // this.publishArticle.emit(article)
      if (this.vm.editMode == true) {
        this.articleFacade.editArticle(article, this.vm.editingArticle!.id);
      } else {
        this.articleFacade.publishArticle(article);
      }
      console.log(article);
    }
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
