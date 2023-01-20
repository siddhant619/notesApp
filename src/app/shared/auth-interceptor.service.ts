import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if there is Anonymous header, don't handle the request, and remove this flag
        if (req.headers.get('anonymous') ) {
          const newHeaders = req.headers.delete('Anonymous')
          const newRequest = req.clone({ headers: newHeaders });
          return next.handle(newRequest);
        } else {
          const token=this.getToken();
          const newRequest = req.clone({ setParams: { 'auth': token } });
          return next.handle(newRequest);
        }
    }
    getToken(){
        const str=localStorage.getItem('userData')
        if(typeof(str)==='string'){
          let userData= JSON.parse(str)
          return userData._token;
    
        }
        return null;
      }
}