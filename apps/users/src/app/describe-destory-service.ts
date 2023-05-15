import {DestroyService} from "./destroy.service";
import {inject, InjectFlags} from "@angular/core";

export function describeDestroyService() {
  return {
    provideDestroyService() {
      return [DestroyService];
    },
    injectDestroyService() {
      return inject(DestroyService, {self: true});
    },
  };
}
