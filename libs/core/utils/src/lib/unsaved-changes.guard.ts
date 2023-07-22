import { CanDeactivateFn } from "@angular/router"
import { Observable } from "rxjs"


export const canDeactivateFormComponent: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
  if (component.canDeactivate) {
    console.log('from canDeactivateFormComponent ')
    return component.canDeactivate()
  }
  console.log('from canDeactivateFormComponent false',component)
  return true
}

export interface DeactivatableComponent {
  canDeactivate: () => boolean | Observable<boolean>
}
