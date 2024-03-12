import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { createdMaterial, Material, MaterialsFacade } from '@users/materials/data-access';
import { ActivatedRoute } from "@angular/router";
import { LetDirective } from '@ngrx/component'
import { map } from 'rxjs';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private materialFacade = inject(MaterialsFacade);
  public status$ = this.materialFacade.materialStatus;
  public materials$ = this.materialFacade.materials$;
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location)
  private id!: number;
  public folderName$ = this.materialFacade.folderName$
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.materialFacade.loadMaterials()
  }

  public onRedirectToBack() {
    this.location.back()
  }
  public onCreateMaterial(data: Omit<createdMaterial, "folder_id">) {
    const createdMaterial: createdMaterial = {
      ...data,
      folder_id: this.id
    };
    this.materialFacade.createMaterial(createdMaterial);
  }
  public onDeleteMaterial(id: number) {
    this.materialFacade.deleteMaterial(id)
  }
}
