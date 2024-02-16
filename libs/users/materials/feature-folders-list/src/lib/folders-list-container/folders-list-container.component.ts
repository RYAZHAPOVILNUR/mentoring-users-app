import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { HttpClient } from '@angular/common/http';
import { delay, from, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MaterialsFacade } from '@users/materials/data-access';
import { Folder } from '../../../../data-access/src/lib/models/folder.model';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  providers: [MaterialsFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private materialsFacade: MaterialsFacade = inject(MaterialsFacade);
  private http: HttpClient = inject(HttpClient);
  // public folders: Folder[] = this.materialsFacade;
  public test: Observable<string> = from(['test', 'newTest']).pipe(delay(2000));
  public obs: Observable<string[]> = this.http.get<string[]>('https://x8ki-letl-twmt.n7.xano.io/api:RaqAbOVN/folder').pipe(tap(res => console.log(res)));
  private store: Store = inject(Store);
  ngOnInit(): void {

  }

  testClick(): void {
    this.materialsFacade.loadFolders();
  }
}
