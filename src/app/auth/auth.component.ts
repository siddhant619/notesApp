import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode:boolean=false;
  error: string=''
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(f: NgForm){
    if(f.invalid) return;
    const email= f.value.email;
    const password=f.value.password;
    if(this.isLoginMode){
      this.authSvc.login(email, password)
      .subscribe({
        next: (res)=>{
          //console.log('post req sent', res);
          this.router.navigate(['/']);
        },
        error: (error)=>{
          this.error=error;

        }
      })
    }
    else{
      this.authSvc.signup(email, password)
      .subscribe({
        next: (res)=>{
          //console.log('post req sent', res);
          this.router.navigate(['/']);
        },
        error: (error)=>{
          this.error=error;

        }
      })
    }
  }
  onModalClose(){
    this.error=''
  }
}
