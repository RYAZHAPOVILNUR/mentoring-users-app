import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailUsersCardComponent } from '../detail-users-card/detail-users-card.component';
import { CreateUserDTO, UsersEntity, UsersFacade } from "@users/users/data-access";
import { Subscription, filter } from 'rxjs';
import { DataExchangeService } from '@users/users/data-access'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-users-detail',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent],
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataExchangeService]
})
export class UsersDetailComponent implements OnDestroy {

  private readonly route = inject(ActivatedRoute);
  private readonly usersFacade = inject(UsersFacade);
  private selectedUserSubscription!: Subscription;
  private dataServiceSubscription!: Subscription;
  private router = inject(Router);

  private dataService = inject(DataExchangeService);
  data$ = this.dataService.data$;

  public userId!: number;

  selectedUser: UsersEntity | undefined;

  constructor() {
    this.setUserId();
    this.getSelectedUser();
  }

  private selectUser(id: number) {
    this.usersFacade.selectId(id);
  }

  private setUserId() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.selectUser(this.userId)
    })
  }

  private getSelectedUser() {
    this.selectedUserSubscription = this.usersFacade.selectedUsers$.subscribe(
      (user) => {
        this.selectedUser = user //Добавить реализацию для случая отсутствия в состоянии пользователя!!!
      }
    )
  }

  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.userId);
    this.router.navigate(['/home'])
  }


  ngOnDestroy(): void {
    this.usersFacade.deleteSelectedId();
    this.selectedUserSubscription.unsubscribe()
  }
}
