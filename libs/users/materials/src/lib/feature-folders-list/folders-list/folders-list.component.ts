import { Component, OnInit, inject, Input, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { typeFolderVM } from "../../../../data-access/src/lib/folders-materials-types/folders-materials-types";
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
	selector: 'folders-list',
	standalone: true,
	templateUrl: './folders-list.component.html',
	imports: [ CommonModule, FoldersCardComponent, MatListModule, MatProgressBarModule ]
})
export class FoldersListComponent{
	@Input({required: true})
	foldersList!: typeFolderVM[] | null;

	@Input({required: true})
	loading!: boolean | null;

	@Output() selectFolder = new EventEmitter()
	@Output() deleteFolder = new EventEmitter()

	onSelectFolder(id: number){
		this.selectFolder.emit(id)
	}

	onDeleteFolder(id: number){
		this.deleteFolder.emit(id)
	}
}