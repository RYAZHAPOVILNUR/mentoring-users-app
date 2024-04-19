import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Material, MaterialsFacade } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MaterialsCardComponent } from '../material-card/materials-card.component';

@Component({
  selector: 'materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MaterialsCardComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly materialsFacade = inject(MaterialsFacade);

  public readonly isLoading$ = this.materialsFacade.isLoading$;
  public readonly materials$ = this.materialsFacade.materials$;

  ngOnInit(): void {
    this.materialsFacade.loadMaterials();
  }

  public backToFolders(): void {
    this.router.navigateByUrl('/materials').then(() => this.materialsFacade.clearMaterials());
  }

  public identify(index: number, item: Material): number {
    return item.id;
  }
}
