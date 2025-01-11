import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MaterialsService{
  determineMaterialType(material_link: string): 'pdf' | 'audio' | 'video' | 'default'{
    const audioExtensions = ['mp3', 'wav', 'aac'];
    const pdfExtensions = 'pdf';
    const isYouTubeLink = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(material_link);
    const extension = material_link.split('.').pop()?.toLowerCase();
    if(!material_link){
      return 'default';
    }
    if(isYouTubeLink){
      return 'video';
    }
    if (extension && audioExtensions.includes(extension)){
      return 'audio';
    }
    if (extension === pdfExtensions){
      return 'pdf';
    }
    return 'default'
  }
}
