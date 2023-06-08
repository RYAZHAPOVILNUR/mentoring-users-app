import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailUsersCardComponent } from '../detail-users-card/detail-users-card.component';
import { CreateUserDTO, UsersEntity, UsersFacade } from "@users/users/data-access";
import { Subscription } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-users-detail',
  standalone: true,
  imports: [CommonModule, DetailUsersCardComponent],
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly usersFacade = inject(UsersFacade);
  private selectedUserSubscription!: Subscription;
  private router = inject(Router);


  public userId!: number;

  currentUser!: UsersEntity | null;

  constructor() {
    this.setUserId();
    this.getCurrentUser(this.userId)
  }


  private setUserId() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }

  private getCurrentUser(id: number) {
    this.usersFacade.getUserFromStore(id).subscribe((user) => {
      this.currentUser = user ? user : null
    })
    console.log('пользователь', this.currentUser)
  }



  public onEditUser(userData: CreateUserDTO) {
    this.usersFacade.editUser(userData, this.userId);
    this.router.navigate(['/home'])
  }

}
