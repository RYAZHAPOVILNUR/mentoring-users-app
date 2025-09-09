import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/data-access-api';
import { LocalStorageService, StorageKey } from '@shared/util-storage';
import { BehaviorSubject, Observable } from 'rxjs';

import { GithubTokenDTO } from '../models/github-token-DTO.interface';
import { GithubUserDTO } from '../models/github-user-DTO.interface';
import { GITHUB_CLIENT_ID } from '../tokens/github-client-id.token';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly apiService = inject(ApiService);
  private readonly clientId = inject(GITHUB_CLIENT_ID);

  public accessToken = new BehaviorSubject<string | null>(this.getStoredAccessToken());

  public loginWithGithub() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + this.clientId);
  }

  public getAccessToken(code: string): Observable<GithubTokenDTO> {
    return this.apiService.get<GithubTokenDTO>('/githubAPI/getAccessToken?code=' + code);
  }

  public getGithubUser(token: string): Observable<GithubUserDTO> {
    return this.apiService.post<GithubUserDTO, GithubTokenDTO>('/githubAPI/getUser', { token });
  }

  public getStoredAccessToken(): string | null {
    return this.localStorageService.get<string>(StorageKey.GITHUB);
  }

  public setStoredAccessToken(token: string): void {
    this.localStorageService.set(StorageKey.GITHUB, token);
  }

  public clearStoredAccessToken(): void {
    this.localStorageService.remove(StorageKey.GITHUB);
  }
}
