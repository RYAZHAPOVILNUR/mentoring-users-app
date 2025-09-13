export { materialFeature } from './lib/+state/material.reducer';

export { MaterialFacade } from './lib/+state/material.facade';

export { MaterialVM } from './lib/types/material-vm.type';
export { MaterialType } from './lib/models/material-type';
export { DeleteMaterialData } from './lib/models/delete-material-data.type';
export { ViewMaterialData } from './lib/models/view-material-data.type';
export { CreateMaterialData } from './lib/models/create-material-data.type';
export * as materialSelectors from './lib/+state/material.selectors';

export * as materialEffects from './lib/+state/material.effects';
