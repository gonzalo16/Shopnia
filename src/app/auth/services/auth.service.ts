import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;


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

  public login(email:string, password:string): Observable<boolean>{
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/login`,{
      email:email,
      password:password
    }).pipe(
      tap(resp => {
        this._user.set(resp.user);
        this._authStatus.set('authenticated');
        this._token.set(resp.token);
        localStorage.setItem('token',resp.token);
      }),
      map(()=>true),
      catchError((err:any) => {
        this._user.set(null);
        this._authStatus.set('not-authenticated');
        this._token.set(null);
        return of(false);
      })
    )
  }

}
