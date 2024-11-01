import { MaterialsEntity } from './data-access/src';
import { MaterialsVM } from './materials-vm';

export type MaterialsVMAdapter = {
  entityToVM(entity: MaterialsEntity): MaterialsVM
}

function determineMaterialType(link: string): 'video' | 'pdf' | 'podcast' | 'unknown' {
  if (link.includes('youtube.com') || link.includes('youtu.be')) {
    return 'video';
  }
  if (link.endsWith('.pdf')) {
    return 'pdf';
  }
  if (link.endsWith('.mp3')) {
    return 'podcast';
  }
  return 'unknown';
}

export const materialsVMAdapter: MaterialsVMAdapter = {
  entityToVM({ id, title, material_link, created_at, folder_id }) {
    return {
      id,
      title,
      materialLink: material_link,
      createdAt: created_at,
      folderId: folder_id,
      type: determineMaterialType(material_link)
    } as MaterialsVM;
  }
};
