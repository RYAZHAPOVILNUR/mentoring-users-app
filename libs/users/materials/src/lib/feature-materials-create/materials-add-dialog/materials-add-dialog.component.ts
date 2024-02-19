import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogClose,
  } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'materials-add-btn',
	templateUrl: './materials-add-dialog.component.html',
	standalone: true,
	imports: [ CommonModule, MatIconModule, ReactiveFormsModule, MatInputModule ],
})
export class MaterialsAddDialogComponent{
	dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
	dialogData: { typeMaterial: string } = inject( MAT_DIALOG_DATA );

	selectPattern(): string {
		switch(this.dialogData.typeMaterial){
			case '.mp4' : return '/[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/';
			case '.pdf' : return '/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/';
			case '.mp3' : return '/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pm3$/';
			default : {
				console.error('error type material!');
				return ''
			}
		}
	}

	material = new FormGroup({
		title: new FormControl('', [ Validators.required ]),
		material_link: new FormControl('', [ Validators.required, Validators.pattern(this.selectPattern()) ])
	})
	
	initNewMaterial(): void {
		if(this.material.valid){
			this.dialogRef.close({
				title: this.material.value.title,
				material_link: this.material.value.material_link
			});
		}
	}
	
	onNoClick(): void {
		this.dialogRef.close();
	}
}