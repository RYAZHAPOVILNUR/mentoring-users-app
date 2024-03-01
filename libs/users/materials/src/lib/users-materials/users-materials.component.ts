import { MaterialsFacade } from './../../../data-access/src/lib/+state/materials.facade';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MaterialFolderAddBtnComponent } from '../../../feature-materials-folder/src/lib/material-folder-add-btn/material-folder-add-btn.component';
import { MaterialFolderItemComponent } from '../../../feature-materials-folder/src/lib/material-folder-item/material-folder-item.component'

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MaterialFolderAddBtnComponent, MaterialFolderItemComponent, PushPipe],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent implements OnInit {
  private readonly facade = inject(MaterialsFacade)
  public readonly materials$ = this.facade.materials$



  ngOnInit(): void {
    this.facade.loadMaterials()
  }
}
