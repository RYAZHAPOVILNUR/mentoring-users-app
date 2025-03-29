import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);
  public readonly materialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly materials$ = this.materialsFacade.filtredMaterials$;

  ngOnInit() {
    this.materialsFacade.loadMaterials();
  }

  onAddPdf() {
    console.log('Create PDF:');
  }
  onAddAudio() {
    console.log('Create AUDIO:');
  }
  onAddVideo() {
    console.log('Create VIDEO:');
  }
}
