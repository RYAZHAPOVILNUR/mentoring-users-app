import { Component, OnInit, inject } from '@angular/core';
import { typeMaterial } from "../../../data-access/src/lib/folders-materials-types/folders-materials-types";
import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
	selector: 'material-content',
	templateUrl: './materials-content.component.html',
	standalone: true,
	styleUrls: ['./materials-content.component.scss'],
	imports: [ PdfViewerModule, CommonModule, MatButtonModule, MatTooltipModule, MatIconModule ],
})
export class MaterialsContentComponent{
	dialog = inject(MatDialog);
	dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
	dialogData: { material: typeMaterial } = inject(MAT_DIALOG_DATA);

	onNoClick(): void {
		this.dialogRef.close();
	}

	getIdVideo( material: typeMaterial ): string {
		let resultSearchId = material.material_link.indexOf('v=');
		return material.material_link.slice(resultSearchId + 2, resultSearchId + 13)
	}

	idVideo: string = this.getIdVideo(this.dialogData.material);
}