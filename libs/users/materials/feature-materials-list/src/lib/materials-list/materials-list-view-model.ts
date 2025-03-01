import { DeepReadonly } from '@users/core/utils';
import { MaterialDTO } from '@users/materials/data-access';
import { MaterialsErrors } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialDTO[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;

export enum MaterialType {
  PDF  = 'pdf',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export const regexMaterials = {
  pdf: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
  audio: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
  video: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
}

//объявление функции с именем materialLinkValidator, которая принимает параметр data типа MaterialType и 
// возвращает функцию-валидатор ValidatorFn - это тип для функции валидации в Angular, который ожидает, 
// что функция вернет объект с ошибками валидации или null, если валидация прошла успешно
export function materialLinkValidator (data: MaterialType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
// возвращается функция, которая принимает параметр control типа AbstractControl. 
// Это объект, представляющий форму или ее элементы в Angular.
// Функция возвращает либо ValidationErrors, если есть ошибка валидации, либо null, если ошибок нет.
    const trimmedValue = control.value?.trim().replace(/\s+/g, ' ');
// Это строка извлекает значение из поля ввода (control.value) и удаляет начальные и конечные пробелы с помощью trim(), а затем заменяет все множественные пробелы внутри строки на один (с помощью регулярного выражения /\s+/g). Это нужно, чтобы привести строку к стандартному виду, убрав лишние пробелы.
    switch (data) {
// конструкция switch, чтобы проверить, какой тип материала передан в параметре data
      case MaterialType.PDF:
        if (regexMaterials.pdf.test(trimmedValue)) return null;
// Проверка каждого типа материала: Если тип материала — PDF, выполняется проверка с использованием регулярного выражения regexMaterials.pdf. Если значение поля ввода соответствует формату PDF (по регулярному выражению), возвращается null, что означает успешную валидацию.
        break;
      case MaterialType.AUDIO:
        if (regexMaterials.audio.test(trimmedValue)) return null;
        break;
      case MaterialType.VIDEO:
        if (regexMaterials.video.test(trimmedValue)) return null;
        break;
    }
    return { error: 'Error'}
// Если ни одно из регулярных выражений не совпало с введенным значением (то есть, если введенная строка не соответствует ни одному из форматов), возвращается объект с ошибкой { error: 'Error' }, который будет содержать ошибку валидации.
  };
}
//Функция materialLinkValidator создает валидатор для проверки ввода в поле формы в зависимости от типа материала. 
// Она проверяет, соответствует ли введенная строка одному из типов материалов (PDF, аудио, видео), 
// используя соответствующие регулярные выражения. Если строка соответствует формату, 
// возвращается null (валидатор проходит). Если строка не соответствует формату, возвращается объект с ошибкой.