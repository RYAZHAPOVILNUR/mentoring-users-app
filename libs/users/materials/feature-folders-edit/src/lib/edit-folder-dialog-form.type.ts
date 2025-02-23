import { FormControl } from '@angular/forms';

export type EditFolderDialogFormType = {
  title: FormControl<string | null>;
  id: FormControl<number | null>;
};
