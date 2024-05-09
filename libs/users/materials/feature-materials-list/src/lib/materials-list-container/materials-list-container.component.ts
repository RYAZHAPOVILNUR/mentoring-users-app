import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';

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
    MaterialsAddButtonComponent
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent implements OnInit{
  private readonly materialsFaced = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public readonly mats$ = this.materialsFaced.mats$;
  public readonly status$ = this.materialsFaced.status$;
  public readonly folderTitle$ = this.materialsFaced.folderTitle$;
  public readonly folder$ = this.materialsFaced.folder$;

  ngOnInit(): void {
    this.materialsFaced.getFolderId(this.id);
    this.materialsFaced.getMats()
  }

  get id(){return this.router.routerState.snapshot.url.replace('/materials/', '')}

  // public onDeleteMat(id: number){
  //   this.materialsFaced.deleteMat(id)
  // }
  
  onBack(){    
    this.router.navigate(['/materials'])
  }

  onDeleteMat(id: number){
    this.materialsFaced.deleteMat(id)
    console.log('container',id);
  }
}
