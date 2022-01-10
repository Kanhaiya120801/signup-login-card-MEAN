import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../users.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileInputLabel: string | undefined;
  constructor(private formBuilder: FormBuilder,
    private toaster: NotificationService,
    private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        aadhar: [''],
        acceptTerms: [false, Validators.requiredTrue]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }


  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.signUpForm.get('aadhar')?.setValue(file);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    
    this.auth.signUp(this.signUpForm.value,this.signUpForm.get('aadhar')?.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toaster.showSuccess('User registered succesfully!!!', 'Success');
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000)
        } 
        if(res.error && res.error.toString().startsWith("E11000 duplicate key error collectio")){
          this.toaster.showError('Username and password must be unique!!!', 'Error')
        }
      },
      (error: any) => {
          this.toaster.showError('Something went wrong. Try Again!!!', 'Error')
      }
    )
  }

}
