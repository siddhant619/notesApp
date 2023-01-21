import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

interface AuthResponseData{
  kind?: string;
  registered?: boolean;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user= new BehaviorSubject<User|null>(null)
  logoutTimer: any
  constructor(private http: HttpClient, private router: Router) { 
   }

  handleAuth(email: string, id: string, token: string, expiresIn: string ){
    const expirationTime= new Date(new Date().getTime() + +expiresIn*1000  );
    const newUser= new User(email, id, token, expirationTime);
    this.user.next(newUser);
    this.autoLogout(+expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(newUser))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseKey
    
    ,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError((errorResponse: any)=>{
        let errorMessage="An unknown error occured"
        if(errorResponse.error.error && errorResponse.error.error.message){
          switch (errorResponse.error.error.message){
            
            case 'INVALID_PASSWORD':
            errorMessage='Password invalid'
            break;
            case 'EMAIL_NOT_FOUND':
              errorMessage='Email not registered'
              break;
          }
            
        }
          
        //return throwError(errorMessage)
        
        return throwError(()=>new Error(errorMessage))
      }),
      tap((res:AuthResponseData)=>{
        this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn)
      })
    )
  }

  autoLogin(){
    if(!localStorage.getItem('userData')){
      return;
    }
    const str=localStorage.getItem('userData')
    if(typeof(str)==='string'){
      let userData= JSON.parse(str)
      const loadedUser= new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration))
      if(loadedUser.token){
        this.user.next(loadedUser);
        this.autoLogout(new Date(userData._tokenExpiration).getTime() - new Date().getTime())
      }
      /* else{
        //console.log('token expired')
        localStorage.removeItem('userData')
      } */

    }
      

  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseKey
    ,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError((errorResponse: any)=>{
        let errorMessage="An unknown error occured"
        if(errorResponse.error.error && errorResponse.error.error.message){
          switch (errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
              errorMessage='Email already exists'
          }
            
        }
          
        //return throwError(errorMessage)
        
        return throwError(()=>new Error(errorMessage))
      }),
      tap((res:AuthResponseData)=>{
        //console.log('in tap, ',res)
        this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn)
      })
    )
    
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['/'])
    if(this.logoutTimer){
      clearTimeout(this.logoutTimer)
    }
    this.logoutTimer=null;
  }
  autoLogout(expirationDuration: number ){
    this.logoutTimer= setTimeout(()=>{
      this.logout();
    }, expirationDuration)

  }
}
