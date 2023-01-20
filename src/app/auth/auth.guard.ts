import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../shared/auth.service";
//@Injectable({providedIn: "root"})
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authSvc: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authSvc.user.pipe(take(1), map(user=>{
            if(user)
                return true;
            else{
                return this.router.createUrlTree(['/auth'])
            }
        }))
    }

}