export { materialsFeature } from './lib/+state/materials/materials.reducer';

export { MaterialsFacade } from './lib/+state/materials/materials.facade';

export { Material } from './lib/interfaces/material.interface';
export { CreateMaterial } from './lib/interfaces/create-material.interface';
export { MaterialType } from './lib/interfaces/material-type';

export { materialRegex } from './lib/utils/materialRegex';
export { iconMap } from './lib/utils/materialIcons';

export * as materialsSelectors from './lib/+state/materials/materials.selectors';

export * as materialsEffects from './lib/+state/materials/materials.effects';
