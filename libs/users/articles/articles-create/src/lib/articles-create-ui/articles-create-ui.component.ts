import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateArticle } from '@users/users/articles/data-access';
import { DeactivatableComponent } from '@users/core/utils';


Quill.register('modules/blotFormatter', BlotFormatter)

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
    MatInputModule
  ],
  templateUrl: './articles-create-ui.component.html',
  styleUrls: ['./articles-create-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ArticlesCreateUiComponent {
  @Output() createArticle = new EventEmitter<CreateArticle>();
  @Output() formChange = new EventEmitter<boolean>();

  public formGroup = new FormGroup({
    textEditor: new FormControl("", {
      validators: [Validators.required, Validators.minLength(66)]
    }),
    title: new FormControl("", {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(66)]
    }),
  });

  public quillEditorModules = {
    toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image']
    ],
    blotFormatter: {}
  }

  constructor() {
    this.checkChanges()
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroup.valid) {
      const article: CreateArticle = {
        title: this.formGroup.value.title as string,
        content: this.formGroup.value.textEditor as string
      }
      this.createArticle.emit(article)
    }
  }

  private checkChanges() {
    this.formGroup.valueChanges.subscribe(() => {
      this.formChange.emit(this.containsUnsavedChanges());
    });
  }

  private containsUnsavedChanges() {
    const initialFormValues = {
      textEditor: '',
      title: ''
    };
    return JSON.stringify(this.formGroup.value) !== JSON.stringify(initialFormValues);
  }

}
