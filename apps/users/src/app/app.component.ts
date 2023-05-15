import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import {UsersService} from "./users.service";
import {FooterComponent, HeaderComponent} from "@users/core/ui/layout";
import {of} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {describeDestroyService} from "./describe-destory-service";

const { provideDestroyService, injectDestroyService } = describeDestroyService();


type UserDTO = {
  sur_name: string,
  first_name: string,
  email_address: string
}

type UserEntity = {
  surname: string,
  firstname: string,
  emailAddress: string
}

type UserVM = UserEntity & {
  checked: boolean,
  changed: boolean,
  opened: boolean
}

enum Test {
  TEST1,
  TEST2
}


@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  providers: [provideDestroyService()],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'users';
  private readonly usersService = inject(UsersService);
  private readonly destory$ = injectDestroyService()

  private readonly test = Test


  constructor(

  ) {
    of().pipe(
      takeUntilDestroyed()
    )
  }
}
