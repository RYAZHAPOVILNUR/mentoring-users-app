import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component'
import { MaterialsListContainerStore } from './materials-list-container.store';
import { map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore]
})
export class MaterialsListContainerComponent implements OnInit, OnDestroy{
  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>(); 
  public readonly materials$ = this.componentStore.materials$.pipe(
  map(materials => materials ?? [])
  );
  public readonly folder$ = this.componentStore.folderId$
  public readonly folderTitle$ = this.componentStore.folderTitle$
  
  @Output() deleteMaterial = new EventEmitter<number>();

  ngOnInit(): void {
    const snapshotId = Number(this.route.snapshot.params['id']);
    if (!isNaN(snapshotId) && snapshotId > 0) {
      this.componentStore.setFolderId(snapshotId);
    }

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = Number(params['id']);
      if (!isNaN(id) && id > 0) {
        this.componentStore.setFolderId(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  returnToFolders(): void {
    this.router.navigate(['/materials']);
  }

  onDeleteMaterial(materialId: number) {
    this.componentStore.deleteMaterial(materialId);
  }
}
