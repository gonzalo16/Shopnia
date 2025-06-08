import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);
  private httpClient = inject(HttpClient);


  public getAuthStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }


    if (this._user()) {
      return 'authenticated';
    } else {
      return 'not-authenticated';
    }
  });

  public getUser = computed<User | null>(() => {
    return this._user();
  });

  public getToken = computed<string | null>(() => {
    return this._token();
  })

}
