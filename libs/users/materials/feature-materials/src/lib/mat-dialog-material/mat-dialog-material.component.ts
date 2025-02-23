import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { linkValidator } from "@users/core/ui";

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./mat-dialog-material.component.html",
    imports: [
        MatFormFieldModule,
        MatDialogModule, 
        MatButtonModule, 
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule
    ],
})

export class DialogMaterialComponent {
    readonly dialogRef = inject(MatDialogRef<DialogMaterialComponent>);
    readonly data = inject(MAT_DIALOG_DATA);

    public formGroup = new FormGroup({
            materialTitle: new FormControl('', Validators.required),
            materialLink: new FormControl('', [Validators.required, linkValidator(this.data.format)]),
        });

    save(): void {
        if(this.formGroup.valid) {
            const material = {
                title: this.formGroup.value.materialTitle,
                material_link: this.formGroup.value.materialLink,
            }
            this.dialogRef.close(material);
        }
    }
}