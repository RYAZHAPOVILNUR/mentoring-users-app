import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MaterialsFacade, materialsFeature } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, LetDirective, MatProgressBarModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly loadingStatus$ = this.materialsFacade.loadingStatus$;
  public readonly currentFolder$ = this.materialsFacade.currentFolder$;

  ngOnInit(): void {
    this.materialsFacade.folderContent();
    this.materialsFacade.loadMaterials();
  }

  public goBack() {
    this.router.navigate(['/materials']);
  }
}
