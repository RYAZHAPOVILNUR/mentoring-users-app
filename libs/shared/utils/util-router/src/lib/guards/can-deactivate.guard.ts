import { CanDeactivateFn } from '@angular/router';

import { DeactivatableComponent } from '../interfaces/deactivatable-component.interface';

export const canDeactivateGuard: CanDeactivateFn<DeactivatableComponent> = ({
  canDeactivate,
}: DeactivatableComponent) => {
  if (!canDeactivate) {
    return true;
  }

  return canDeactivate();
};
