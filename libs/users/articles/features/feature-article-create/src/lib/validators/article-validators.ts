import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ArticleValidators {
  static validateTitle(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim() || '';

    if (value.length < 6) {
      return { minLength: 'Text must be at least 6 symbols long' };
    }
    if (value.length > 60) {
      return { maxLength: 'Text must be no more than 60 symbols long' };
    }
    return null;
  }

  static validateContent(control: AbstractControl): ValidationErrors | null {
    const raw = control.value;
    let text = raw.replace(/<[^>]*>/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.trim();
    return text.length >= 66 ? null : { minLength: 'Text must be at least 66 symbols long' };
  }
}
