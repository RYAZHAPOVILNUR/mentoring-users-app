import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { IBacklog, BacklogFacade } from "@users/users/backlog/data-access";
import { Observable } from "rxjs";




@Component({
  selector: 'users-backlog',
  standalone: true,
  imports: [CommonModule, MatListModule, NgFor, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './users-backlog.component.html',
  styleUrls: ['./users-backlog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogComponent implements OnInit {
  private readonly backlogFacade = inject(BacklogFacade)
  public readonly backlogs: Observable<IBacklog[]> = this.backlogFacade.backlog$;

  ngOnInit() {
    this.backlogFacade.initBacklog()
  }

  onDeleteBacklogItem(id: number) {
    this.backlogFacade.deleteBacklog(id)
  }

  // inProgress() {
  //   console.log('click')
  // }
  //
  // addAssigned() {
  //   console.log('ds')
  // }
}
