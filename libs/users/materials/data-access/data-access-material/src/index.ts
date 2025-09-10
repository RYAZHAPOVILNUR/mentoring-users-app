export { materialsFeature } from './lib/+state/materials.reducer';

export { MaterialsFacade } from './lib/+state/materials.facade';

export { Material } from './lib/interfaces/material.interface';
export { CreateMaterial } from './lib/interfaces/create-material.interface';
export { MaterialType } from './lib/types/material-dialog-data';

export { materialRegex } from './lib/utils/material-regex-map';
export { materialIconMap } from './lib/utils/material-icon-map';

export * as materialsSelectors from './lib/+state/materials.selectors';

export * as materialsEffects from './lib/+state/materials.effects';
