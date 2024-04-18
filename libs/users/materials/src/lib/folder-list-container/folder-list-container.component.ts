import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { MaterialFacade } from '@users/materials/data-access';
import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  standalone: true,
  selector: 'users-folder-list-container',
  templateUrl: './folder-list-container.component.html',
  styleUrls: ['./folder-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetDirective, FolderListComponent],
})
export class FolderListContainerComponent implements OnInit {
  private readonly materialFacade = inject(MaterialFacade);
  public readonly folders$ = this.materialFacade.allFolders$;
  public readonly status$ = this.materialFacade.status$;
  public readonly error$ = this.materialFacade.error$;

  public ngOnInit(): void {
    this.materialFacade.loadFolders();
  }
}
