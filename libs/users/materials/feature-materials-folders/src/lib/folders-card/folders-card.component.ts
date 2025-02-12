import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent implements OnInit{
  private materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;

  ngOnInit(): void {
    this.materialsFacade.loadFolders()
  }
}
