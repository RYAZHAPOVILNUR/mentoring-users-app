import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
	MatDialog,
} from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'folders-add-btn',
	templateUrl: 'folders-add.component.html',
	standalone: true,
	imports: [ MatIconModule ],
})
export class FoldersAddComponent{
	dialog = inject(MatDialog);

	@Output() postNewFolder = new EventEmitter()

	openDialog(): void {
		const dialogRef = this.dialog.open(FoldersAddDialogComponent);
	
		dialogRef.afterClosed().subscribe((result : string) => {
			if (result) this.postNewFolder.emit(result)
		});
	}
	
}