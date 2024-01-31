import { Pipe, PipeTransform } from '@angular/core';
import { MaterialType } from './data-access/src';

@Pipe({
  name: 'typeMaterials',
  standalone: true,
})
export class TypeMaterialsPipe implements PipeTransform {
  
  transform(material_link: string, ...args: unknown[]): MaterialType {
    return this.dataType(material_link);
  }

  dataType(material_link: string):MaterialType{
    const typeMaterial: MaterialType = 
      this.isPdfUrl(material_link)? 'pdf': 
      this.isAudioUrl(material_link)? 'audio' :  
      this.isYoutubeUrl(material_link)? 'video' : 'undefined';
    return typeMaterial;
  }

  isPdfUrl(url: string) {
   return /\.pdf$/.test(url);
  }
  isAudioUrl(url: string) {
    return /\.mp3$/i.test(url);
  }
  isYoutubeUrl(url: string){
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return p.test(url);
  }
}


