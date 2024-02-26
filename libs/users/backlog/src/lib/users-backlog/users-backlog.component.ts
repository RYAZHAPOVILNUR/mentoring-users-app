import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IBacklog, BacklogFacade } from '@users/users/backlog/data-access';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskChangeDialogComponent } from '../../../../task/src/lib/task-change-dialog/task-change-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-backlog',
  standalone: true,
  imports: [CommonModule, MatListModule, NgFor, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './users-backlog.component.html',
  styleUrls: ['./users-backlog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogComponent implements OnInit {
  private readonly backlogFacade = inject(BacklogFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly matDialog = inject(MatDialog);

  public readonly backlogs: Observable<IBacklog[]> = this.backlogFacade.backlog$;
  public readonly backlogStatus: {
    new: string;
    inProgress: string;
    done: string;
  }[] = [{ new: 'Новая', done: 'Завершено', inProgress: 'В процессе' }];

  ngOnInit() {
    this.backlogFacade.initBacklog();
  }

  onDeleteBacklogItem(id: number) {
    this.backlogFacade.deleteBacklog(id);
  }

  onChangeStatus(status: string) {
    console.log(status);
  }

  public openBacklogModal(task?: IBacklog): void {
    const newBacklogData = task
      ? {
          title: task?.title,
          description: task?.description,
          id: task?.id,
        }
      : null;

    const dialogRef: MatDialogRef<TaskChangeDialogComponent> = this.matDialog.open(TaskChangeDialogComponent, {
      width: '1040px',
      data: newBacklogData,
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
