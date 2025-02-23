import { FormControl } from '@angular/forms';

export type EditMaterialDialogFormType = {
  title: FormControl<string | null>;
  id: FormControl<number | null>;
};
