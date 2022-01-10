import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationService } from '../operation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    
  constructor( private operationalService: OperationService) { }   
  
  login(emailAndPassword : any){
    return new Observable((observer)=>{
        this.operationalService.post('/login',emailAndPassword,false)
        .subscribe(
            (res : any)=>{
                observer.next(res);
                observer.complete();
            },
            (error : any)=>{
                observer.error(error);
                observer.complete();
            }
        )
    })
  }

  signUp(data : any,file:File){
    const formData = new FormData();
    formData.append('aadhar', file);
    formData.append('fullname', data.fullname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    return new Observable((observer)=>{
        this.operationalService.post('/signup',formData,false)
        .subscribe(
            (res : any)=>{
                observer.next(res);
            },
            (error : any)=>{
                observer.error(error);
                observer.complete();
            }
        )
    })
  }

  userUpdate(data : any,file:File){
    console.log(file,"file in user")
    const formData = new FormData();
    formData.append('aadhar', file);
    formData.append('fullname', data.fullname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('userID', data.userID);


    return new Observable((observer)=>{
        this.operationalService.post('/update-profile',formData,false)
        .subscribe(
            (res : any)=>{
                observer.next(res);
            },
            (error : any)=>{
                observer.error(error);
                observer.complete();
            }
        )
    })
  }

  
}
