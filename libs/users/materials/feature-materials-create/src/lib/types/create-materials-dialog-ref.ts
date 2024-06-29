import { MatDialogRef } from "@angular/material/dialog";
import { CreateMaterialsEntity } from "@users/users/materials/data-access";
import { CreateMaterialsDialogComponent } from "../create-materials-dialog/create-materials-dialog.component";

export type CreateMaterialsDialogRef = MatDialogRef<CreateMaterialsDialogComponent, CreateMaterialsEntity>;