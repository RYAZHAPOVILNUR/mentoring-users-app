import { Observable } from 'rxjs';

export interface DeactivatableComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}
