import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef)
  public readonly inputName = new FormControl('', {nonNullable: true, validators: Validators.required});
  private readonly materialsFaced = inject(MaterialsFacade);

  public closeDialog(){
    this.dialogRef.close()
  }

  public onSave(){
    this.dialogRef.close();
    this.materialsFaced.addFolder(this.inputName.value)
  }
}