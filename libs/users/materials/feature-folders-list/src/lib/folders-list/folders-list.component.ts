import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit{
  
  private readonly facade = inject(MaterialsFacade);

  status = '';
  public readonly folders$ = this.facade.allFolders$;
  public readonly status$ = this.facade.status$;

  ngOnInit(): void {
    this.facade.initFolders()
    this.status$.subscribe(value => this.status = value)
    console.log(this.status)
  }
}
