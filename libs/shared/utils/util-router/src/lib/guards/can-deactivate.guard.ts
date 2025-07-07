import { CanDeactivateFn } from '@angular/router';

import { DeactivatableComponent } from '../interfaces/deactivatable-component.interface';

export const canDeactivateGuard: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
  if (!component.canDeactivate) {
    return true;
  }

  return component.canDeactivate();
};
