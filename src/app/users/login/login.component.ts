import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../users.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private toaster: NotificationService,
    private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    
  }

  
  buildForm(){
    this.loginForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let data = {
      username:this.loginForm.value.username,
      password: this.loginForm.value.password
    }
      this.auth.login(data).subscribe(
        (res : any)=>{
          console.log("res in login",res)
          if(res.status === 200){
            this.toaster.showSuccess('User Login succesfully!!!','Success');
            console.log("userId",res)
            localStorage.setItem('token',res.token);
            localStorage.setItem('userID',res.user._id);
            const navigationExtras: NavigationExtras = {
              queryParams: {
                'viewUser': res.user._id
              }
            };
            setTimeout(()=>{
              this.router.navigate(['/dashboard'],navigationExtras);
            },2000)
          }
          if(res.message){
            this.toaster.showError(res.message,"Failure!!")
          }
        },
        (error)=>{
          console.log(error,"error in login")
            this.toaster.showError("Your credentail doesn't match!!!",'Error')
        }
      )

  }

}
