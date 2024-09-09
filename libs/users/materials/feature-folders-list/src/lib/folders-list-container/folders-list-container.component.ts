import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateFoldersButtonComponent } from '../../../../feature-folders-create/src';
import { MaterialsFacade } from '../../../../data-access/src'
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    CreateFoldersButtonComponent,
    LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.materialsFacade.status$;
  public readonly folder$ = this.materialsFacade.folder$;
  public readonly error$ = this.materialsFacade.error$;

}
