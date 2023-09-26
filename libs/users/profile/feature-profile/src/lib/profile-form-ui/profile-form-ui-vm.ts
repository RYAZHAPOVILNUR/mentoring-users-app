import { LoadingStatus, UsersEntity } from "@users/core/data-access"

export type ProfileFormVm = {
  user: UsersEntity,
  status: string,
  isMyProfile: boolean,
  githubUserName?: string;
  githubStatus?: LoadingStatus;
  isLoggedUser: boolean;
}

/**
 * vm: LetViewContextValue<{githubUserName: Observable<string | undefined>,
 * isMyProfile: Observable<boolean>,
 * isLoggedUser: Observable<boolean>,
 * user: Observable<unknown>,
 * status: Observable<unknown>,
 * githubStatus: Observable<unknown>}>
 */

/**
 * Type LetViewContextValue<
 * {githubUserName: Observable<string | undefined>,
 * isMyProfile: Observable<boolean>,
 * isLoggedUser: Observable<boolean>,
 * user: Observable<unknown>, status: Observable<unknown>,
 * githubStatus: Observable<unknown>}> is not assignable to type ProfileFormVm
 */


/**
 * *ngrxLet="{
 *   user: user$,
 *   status: status$,
 *   isMyProfile: isMyProfile$,
 *   githubUserName: githubUserName$,
 *   githubStatus: githubStatus$,
 *   isLoggedUser
 * } as vm">
 *
 */
