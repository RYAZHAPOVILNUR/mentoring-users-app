import { Pipe, PipeTransform } from '@angular/core';
import { MATERIAL_TYPES } from '../../../../constants/material-types.constants';

@Pipe({ name: 'materialTypeIcon', standalone: true })
export class MaterialTypeIconPipe implements PipeTransform {
  transform(value: string): string {
    const typeInfo = Object.values(MATERIAL_TYPES).find((type) => type.validationRegex.test(value));
    return typeInfo ? typeInfo.icon : 'help';
  }
}
