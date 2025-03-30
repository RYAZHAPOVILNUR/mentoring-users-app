import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ComponentStore } from "@ngrx/component-store";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { DeepReadonly } from "@users/core/utils";
import { FoldersEntity, FoldersVM, foldersVMAdapter, MaterialsFacade } from "@users/materials/data-access";
import { tap } from "rxjs";

type FoldersListState = DeepReadonly<{
    folders: FoldersVM[];
  }>;

  const initialState: FoldersListState = {
    folders: [],
  }; 

@Injectable()
export class FoldersListContainerStore extends ComponentStore <FoldersListState>{

  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);

  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.materialsFacade.foldersStatus$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.errors$, (error) => error);

    constructor() {
        super(initialState);
        this.materialsFacade.init();
        this.setFoldersFromGlobalToLocalStore();
    }

    private setFoldersFromGlobalToLocalStore(): void {
      this.effect(() =>
        this. materialsFacade.allFolders$.pipe(tap((folders: FoldersEntity[]) => this.patchFolders(folders)))
      );
    }

    private patchFolders(folders: FoldersEntity[]): void {
      this.patchState({
        folders: folders.map((folder) => foldersVMAdapter.entityToVM(folder)),
      });
    }

    public deleteFolder(folder: FoldersVM): void {
      const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
        data: { dialogText: `Вы уверены, что хотите удалить "${folder.title}"?` },
      });
      this.effect(() =>
        dialogRef.afterClosed().pipe(
          tap((result: boolean) => {
            if (result) this.materialsFacade.deleteFolder(folder.id);
          })
        )
      );
    }
}
