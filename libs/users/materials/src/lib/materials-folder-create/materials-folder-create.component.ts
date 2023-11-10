import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { CreateFolder, MaterialFacade } from '@users/materials/data-access';


@Component({
  selector: 'users-materials-folder-create',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule],
  templateUrl: './materials-folder-create.component.html',
  styleUrls: ['./materials-folder-create.component.scss'],
})
export class MaterialsFolderCreateComponent {
  private readonly articleFacade = inject(MaterialFacade);
  private dialogRef = inject(MatDialogRef<MaterialsFolderCreateComponent>)

  public folderName = '';

  public create() : void{

    const folder:CreateFolder={
      title:this.folderName
    }

    this.articleFacade.createFolder(folder)
    this.dialogRef.close(folder)
  }

  public cancel():void {
    this.dialogRef.close(null)
  }

}
