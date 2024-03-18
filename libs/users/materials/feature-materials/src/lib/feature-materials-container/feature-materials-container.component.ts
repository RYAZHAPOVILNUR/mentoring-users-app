import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MaterialListComponent } from '../material-list/material-list.component';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/model/folders-models';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'users-feature-materials-container',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressBarModule,
    MaterialListComponent,
    LetDirective,
    PushPipe
  ],
  templateUrl: './feature-materials-container.component.html',
  styleUrls: ['./feature-materials-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureMaterialsContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly facade = inject(MaterialsFacade)
  public openedFolder$ = this.facade.openedFolder$
  public filteredMaterials$ = this.facade.filteredMaterials$
  public materialsStatus$ = this.facade.materialsStatus$
  private destroyRef = inject(DestroyRef);



  ngOnInit(): void {
    this.facade.loadMaterials()
    this.subscribeToOpenedFolder()
  }

  private subscribeToOpenedFolder(): void {
    this.facade.openedFolder$.pipe(
      tap(openedFolder => {
        if (!openedFolder) {
          this.facade.loadFolders();
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }


  public deleteMaterial(material: IMaterial): void {

  }

  public backOnFolders() {
    this.router.navigate(['/materials'])
  }
}
