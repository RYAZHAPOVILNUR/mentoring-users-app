import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { PushPipe } from '@ngrx/component';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MaterialsAddButtonComponent,
    PushPipe
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent implements OnInit{
  private readonly materialsFaced = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public readonly mats$ = this.materialsFaced.mats$;
  public readonly status$ = this.materialsFaced.status$;
  public readonly folder$: Observable<Folder> = this.materialsFaced.folder$;
  private readonly folderlId: string = this.router.routerState.snapshot.url.replace('/materials/', '');

  ngOnInit(): void {
    this.materialsFaced.loadFolderId(this.folderlId);
    this.materialsFaced.loadMaterials()
  }
  
  public onBack(){    
    this.router.navigate(['/materials'])
  }

  public deleteMaterial(materialId: number){
    this.materialsFaced.deleteMaterial(materialId)
  }
}
