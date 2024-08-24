import { ComponentStore } from '@ngrx/component-store';
import { FoldersVM } from 'libs/users/materials/folders-vm';
import { inject, Injectable } from "@angular/core";
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FolderType } from 'libs/users/materials/data-access/src/lib/+state/folder.materials.model';
import { tap } from 'rxjs';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

type FoldersListState = {
    folders: FolderType[];
}

const initialState: FoldersListState = {
    folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
    private readonly foldersFacade = inject(MaterialsFacade)
    private readonly dialog = inject(MatDialog);
    public readonly folders$ = this.select(({ folders }) => folders);
    public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
    public errors$ = this.select(this.foldersFacade.errors$, (error) => error);

    constructor() {
        super(initialState);
        this.foldersFacade.load();
        this.setFoldersFromGlobalToLocalStore();
    }

    private setFoldersFromGlobalToLocalStore(): void {
        this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FolderType[]) => folders)));
    }

    public deleteFolder(folder: FolderType): void {
        const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
        data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
        });
        this.effect(() =>
        dialogRef.afterClosed().pipe(
            tap((result: boolean) => {
            if (result) this.foldersFacade.deleteFolder(folder.id);
            })
        )
        );
    }
}