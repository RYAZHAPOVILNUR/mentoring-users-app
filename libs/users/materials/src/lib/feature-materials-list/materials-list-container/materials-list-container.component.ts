import { Component, OnInit, inject, } from '@angular/core';
import { MaterialsListContainerStore } from './materials-list-container.store'
import { CommonModule, Location } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddComponent } from '../../feature-materials-create/materials-add-btn/materials-add.component';
import { typeMaterialPostRequest, typeMaterial } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MaterialsContentComponent } from '../../feature-materials-content/materials-content.component';
import {
	MatDialog,
} from '@angular/material/dialog';

@Component({
	selector: 'materials-list-container',
	standalone: true,
	templateUrl: './materials-list-container.component.html',
	providers: [MaterialsListContainerStore],
	imports: [CommonModule, MaterialsListComponent, MatIconModule, MaterialsAddComponent]
})
export class MaterialsListContainerComponent implements OnInit {
	ContainerStore = inject(MaterialsListContainerStore);
	router = inject(Router);
	private readonly route = inject(ActivatedRoute)
	private readonly _location = inject(Location)
	public readonly materials$ = this.ContainerStore.materials$;
	public readonly isLoading$ = this.ContainerStore.isLoading$;
	public readonly folder$ = this.ContainerStore.folderTitle$;
	dialog = inject(MatDialog);

	goBack() {
		this._location.back();
	}

	onSelectMaterial( id: number ) {
		let material: typeMaterial[] = [];
		this.materials$.subscribe( materials => material = materials.filter(value => value.id == id ));
		
		const dialogRef = this.dialog.open( MaterialsContentComponent , {
			data: {
				material: material.length < 2 ? material[0] : console.error('not unique id')
				// Вопрос - уместен ли тут хард код ?  
			}
		});
	}

	onCreateNewMaterial(data: typeMaterialPostRequest) {
		this.ContainerStore.postMaterial(data);
	}

	onDeleteMaterial(id: number) {
		this.ContainerStore.deleteMaterial(id);
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');

		if (id) {
			this.ContainerStore.loadMaterials(+id);
			this.ContainerStore.loadFolder(+id);
		}
	}
}