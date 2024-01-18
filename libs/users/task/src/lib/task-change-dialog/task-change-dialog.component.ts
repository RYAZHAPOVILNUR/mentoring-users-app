import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { UsersFacade } from '@users/users/data-access';
import { PushPipe } from '@ngrx/component';
import { UsersEntity } from '@users/core/data-access';
import { skip } from 'rxjs/operators';
import { BacklogFacade } from "@users/users/backlog/data-access";

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
export class TaskChangeDialogComponent {
  public readonly data: any = inject(MAT_DIALOG_DATA);
  private readonly backlogFacade = inject(BacklogFacade)
  private readonly usersFacade = inject(UsersFacade);
  private dialogRef = inject(MatDialogRef<TaskChangeDialogComponent>);
  public status = false;
  constructor() {
    this.usersFacade.init();
  }

  public storyPoint:StoryPoint= {

     "UX":"?",
      "DESING":"?",
      "FRONT":"?",
      "BACK":"?",
  };


  get totalPoint(): string {
    const values = Object.values(this.storyPoint);

if(Object.values(this.storyPoint).every(value => value === "?")) return '?'

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
      ...this.storyPoint, [category]: value
    };
  }




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

  ngOnInit() {
    console.log(this.data);
    console.log('this.editMode', this.editMode);
    this.users$.pipe(skip(1)).subscribe(() => {
      this.status = true;
    });
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

  public quillEditorModules = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
    ],
  };

  public cancel(): void {
    this.dialogRef.close();
  }

  public saveChanges(): void {
    this.backlogFacade.addBacklog({
      title: this.textareaValue,
      description: this.editorContent
    })
    this.dialogRef.close();
  }
}
