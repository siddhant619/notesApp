import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';  
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean= false;
  userSubscription: Subscription;
  faRightFromBracket=faRightFromBracket
  constructor(private authSvc: AuthService) {
    this.userSubscription=Subscription.EMPTY;
   }

  ngOnInit(): void {
    this.userSubscription= this.authSvc.user.subscribe({
      next: (response)=>{
        if(response)
          this.isAuthenticated=true;
        else
          this.isAuthenticated=false;
      }
    })
  }

  onLogout(){
    this.authSvc.logout()
    
  }

}
