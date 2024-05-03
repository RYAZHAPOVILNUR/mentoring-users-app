import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsContentComponent } from './materials-content/materials-content.component';

@NgModule({
  imports: [CommonModule, MaterialsContentComponent],
  exports: [MaterialsContentComponent]
})
export class FeatureMaterialsContentModule {}
