import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorsKey, ERRORSS } from '../enums/ErrorsKey.enum';

@Injectable()
export class MaterialFormGroup {
  private readonly fb = inject(FormBuilder);
  private readonly validationErrors = inject(ERRORSS);

  getMaterialFormGroup() {
    return this.fb.nonNullable.group({
      materialTitle: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      materialLink: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern(/^(?=.*http).*\.(mp3|pdf)$|^(?=.*http).*(youtube|youtu\.be)/)
      ]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.getMaterialFormGroup().get(fieldName);
    if (!field) return '';
    const key = Object.values(ErrorsKey).find((key) => field.hasError(key));
    if (!key) return '';
    return this.validationErrors[key];
  }
}


// export  fabric = (translateService: TranslateService) => ({
//   required: translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
//   minlength: translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
//   pattern: translateService.instant('MATERIALS.VALIDATION_PATTERN')
// });


//import { inject, Injectable } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ErrorsKey, ERRORSS } from '../enums/ErrorsKey.enum';
//
// @Injectable()
// export class MaterialFormGroup {
//   private readonly fb = inject(FormBuilder);
//   private readonly validationErrors = inject(ERRORSS);
//   // todo мне не нравится что форма хранится в рутовом сервисе, но я сам так делал, так что похуй)
//   public materialFormGroup = this.fb.nonNullable.group({
//     materialTitle: ['', [
//       Validators.required,
//       Validators.minLength(2)
//     ]],
//     materialLink: ['', [
//       Validators.required,
//       Validators.minLength(9),
//       Validators.pattern(/^(?=.*http).*\.(mp3|pdf)$|^(?=.*http).*(youtube|youtu\.be)/)
//     ]]
//   });
//
//   // todo код используется в шаблоне что ведёт к бесконечному обновлению (do it! pipe)
//   getErrorMessage(fieldName: string): string {
//     const field = this.materialFormGroup.get(fieldName);
//     if (!field) return '';
//
//     // todo это мне не нравится. надо объяснить почему только 1! (документация, наглядный код)
//     // todo пользователь этого пайпа может использовать еще один пайп для обрезки этого массива
//     //  todo к тому же зачем делать из массива массив из которого брать первое значение7
//     // const errorKey: Platform[keyof Platform] = Object.keys(field.errors)[0];
//
//
//     console.log('field.errors', field.errors as ErrorsKey[keyof ErrorsKey]);
//
//     // todo Map здесь не нужна, посмотри в консоль что там у тебя хранится "строка": string (Record<string, string>)
//     // const keyValueErrors = new Map([
//     //   ['required', this.translateService.instant('MATERIALS.VALIDATION_REQUIRED')],
//     //   // todo БОЛЬШЕ это сколько? вывести пользователю нормальную инфу в виде "Введите минимум N символов, сейчас P"
//     //   ['minlength', this.translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH')],
//     //   ['pattern', this.translateService.instant('MATERIALS.VALIDATION_PATTERN')]
//     // ]);
//
//     // todo -"а что значит рекорд?"
//     // todo каждый раз когда это (getErrorMessage) вызывается происходит перевод одной и той же строки
//     //  (не легче вынести это в конфиг или енам?)
//     // const fieldddd: Record<string, string> = {
//     //   required: this.translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
//     //   minlength: this.translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
//     //   pattern: this.translateService.instant('MATERIALS.VALIDATION_PATTERN')
//     // };
//     // return '';
//     const key = Object.values(ErrorsKey).find((key) => field.hasError(key));
//     if (!key) return '';
//     // const asd = (Object.keys(field.errors))[0]
//     return this.validationErrors[key];
//
//
//     // console.log('keyValueErrors', keyValueErrors);
//     // console.log('result', keyValueErrors.get(errorKey) || '');
//     // return fieldddd[errorKey];
//     // return keyValueErrors.get(errorKey) || '';
//   }
// }
//
// // export  fabric = (translateService: TranslateService) => ({
// //   required: translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
// //   minlength: translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
// //   pattern: translateService.instant('MATERIALS.VALIDATION_PATTERN')
// // });