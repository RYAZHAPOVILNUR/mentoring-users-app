import { Pipe, PipeTransform } from '@angular/core';
import { MaterialType, MaterialsEntity } from '@users/users/materials/data-access';
import { getMaterialType } from '@users/users/materials/utils';

const enum IconType {
  Pdf = 'insert_drive_file',
  Video = 'ondemand_video',
  Podcast = 'music_note',
  Default = 'insert_drive_file',
};

const Icons = {
  [MaterialType.Pdf]: IconType.Pdf,
  [MaterialType.Video]: IconType.Video,
  [MaterialType.Podcast]: IconType.Podcast,
};

@Pipe({
  name: 'materialIcon',
  standalone: true,
})
export class MaterialIconPipe implements PipeTransform {
  transform(material: MaterialsEntity): IconType {
    const materialType = getMaterialType(material.materialLink);
    return materialType ? Icons[materialType] : IconType.Default
  }
}
