import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsFacade } from '@users/materials/facade'
import { FoldersCardComponent } from "./folders-card/folders-card.component";
import { FoldesAddButtonComponent } from '../../../../feature-folders-create/folders-add-button/folders-add-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, FoldersCardComponent, FoldesAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit {
  materialFacade = inject(MaterialsFacade);
  router = inject(Router);
  selectIndex: number | null = null;
  @HostListener('document:keydown.enter', ['$event'])
  @HostListener('document:keydown.arrowup', ['$event'])
  @HostListener('document:keydown.arrowdown', ['$event'])
  // folder

  ngOnInit(): void {
    this.materialFacade.initFolders()
  }

  openFolder(id: number){
    this.router.navigate(['/materials/', id ])
  }

  selectFolder(index: number) {
    this.selectIndex = index;
  }


  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    if (this.selectIndex === null || !this.materialFacade.foldersAll) return;
    const folders = this.materialFacade.foldersAll;
    if (this.selectIndex >= 0 && this.selectIndex < folders.length) {
      this.openFolder(folders[this.selectIndex].id);
    }
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  @HostListener('document:keydown.arrowup', ['$event'])
  handleArrowKeys(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.materialFacade.foldersAll) return;
    const foldersCount = this.materialFacade.foldersAll.length;

    if (event.key === 'ArrowDown') {
      this.selectIndex = this.selectIndex === null ? 0 : Math.min(this.selectIndex + 1, foldersCount - 1);
    } else if (event.key === 'ArrowUp') {
      this.selectIndex = this.selectIndex === null ? 0 : Math.max(this.selectIndex - 1, 0);
    }
  }
}

