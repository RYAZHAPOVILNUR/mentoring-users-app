import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { PushPipe } from '@ngrx/component';
import { QuillModule } from 'ngx-quill';
import { skip } from 'rxjs/operators';

import { UsersEntity } from '@users/core/data-access';
import { BacklogFacade, IBacklog } from '@users/users/backlog/data-access';
import { UsersFacade } from '@users/users/data-access';

interface Task {
  name: string;
  descriprion: string;
  priority: string;
  status: string;
  assignees: UsersEntity[];
}

interface StoryPoint {
  UX: string;
  DESING: string;
  FRONT: string;
  BACK: string;
}

@Component({
  templateUrl: './task-change-dialog.component.html',
  styleUrls: ['./task-change-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    PushPipe,
    MatListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskChangeDialogComponent implements OnInit {
  private readonly backlogFacade = inject(BacklogFacade);
  private readonly usersFacade = inject(UsersFacade);
  private dialogRef = inject(MatDialogRef<TaskChangeDialogComponent>);
  public readonly data: Pick<IBacklog, 'title' | 'description'> = inject(MAT_DIALOG_DATA);

  public status = false;

  public storyPoint: StoryPoint = {
    UX: '?',
    DESING: '?',
    FRONT: '?',
    BACK: '?',
  };
  public task: Task = {
    name: this.data?.title,
    descriprion: this.data?.description ?? 'У тасок в меню "Задачи" с бека description не приходит',
    priority: 'high',
    status: 'progress',
    assignees: [
      {
        id: 80,
        name: 'Dzhavid',
        email: 'strategy05@mail.ru',
        username: 'Dzhavid',
        city: '',
        purchaseDate: new Date().toString(),
        educationStatus: 'trainee',
        educationTime: 0,
        totalStoryPoints: 0,
        photo: {
          path: '/vault/XBYkUImp/a3wAS70PV6uO4QH5_mRMIkW22KU/bQW7WA../file-f0764d.png',
          name: 'file-f0764d.png',
          type: 'image',
          size: 37021,
          mime: 'image/jpeg',
          meta: {
            width: 256,
            height: 256,
          },
          url: 'https://x8ki-letl-twmt.n7.xano.io/vault/XBYkUImp/a3wAS70PV6uO4QH5_mRMIkW22KU/bQW7WA../file-f0764d.png',
        },
        isAdmin: false,
      },
    ],
  };
  public editMode = this.data !== null;
  public textareaValue = this.editMode ? this.task.name : '';
  public editorContent: string = this.editMode ? this.task.descriprion : '';
  public editStatus = false;
  public users$ = this.usersFacade.allUsers$;
  public quillEditorModules = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
    ],
  };
  constructor() {
    this.usersFacade.init();
  }

  ngOnInit() {
    console.log(this.data);
    console.log('this.editMode', this.editMode);
    this.users$.pipe(skip(1)).subscribe(() => {
      this.status = true;
    });
  }
  get totalPoint(): string {
    const values = Object.values(this.storyPoint);

    if (Object.values(this.storyPoint).every((value) => value === '?')) return '?';

    return values.reduce((total, currentValue) => {
      const parsedValue = parseFloat(currentValue);
      if (!isNaN(parsedValue)) {
        return total + parsedValue;
      } else {
        return total;
      }
    }, 0);
  }

  setPoint(category: string, value: string) {
    this.storyPoint = {
      ...this.storyPoint,
      [category]: value,
    };
  }

  addAssigned(assigned: UsersEntity): void {
    this.task = { ...this.task, assignees: [...this.task.assignees, assigned] };
  }

  removeAssigned(id: number): void {
    this.task = {
      ...this.task,
      assignees: this.task.assignees.filter((el) => el.id !== id),
    };
  }

  onChangeStatus(status: string): void {
    this.task = { ...this.task, status };
  }

  onChangePriority(priority: string): void {
    this.task = { ...this.task, priority };
  }

  toggleQuill() {
    this.editMode = true;
    this.editStatus = !this.editStatus;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public saveChanges(): void {
    this.backlogFacade.addBacklog({
      title: this.textareaValue,
      description: this.editorContent,
    });
    this.dialogRef.close();
  }
}
