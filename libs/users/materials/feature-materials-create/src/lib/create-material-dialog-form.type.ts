import { FormControl } from '@angular/forms';

export type CreateMaterialDialogFormType = {
  title: FormControl<string | null>;
  materialLink: FormControl<string | null>;
  folderId: FormControl<number | null>;
  materialFormat: FormControl<string | null>;
};
