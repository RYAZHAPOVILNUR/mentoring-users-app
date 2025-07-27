import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Backlog } from '@users/shared/data-access-models';
import { Observable } from 'rxjs';

import { BacklogFacade } from '@users/backlog/data-access-backlog';
import { TaskChangeDialogComponent } from '@users/tasks/feature-tasks';

@Component({
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogComponent implements OnInit {
  private readonly backlogFacade = inject(BacklogFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly matDialog = inject(MatDialog);

  public readonly backlogs: Observable<Backlog[]> = this.backlogFacade.backlog$;
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

  public openBacklogModal(task?: Backlog): void {
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
