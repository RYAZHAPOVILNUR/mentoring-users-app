import { Injectable } from '@angular/core';
import { IMaterial } from '@users/materials/data-access';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsCardService {
  private materialSource = new BehaviorSubject<IMaterial>({
    id: 0,
    created_at: '',
    title: '',
    material_link: '',
    folder_id: 0,
  });
  public material$ = this.materialSource;

  setMaterial(materialData: IMaterial) {
    this.materialSource.next(materialData);
  }
}
