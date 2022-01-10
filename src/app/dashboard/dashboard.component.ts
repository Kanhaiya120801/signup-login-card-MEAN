import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  public userID: any;
  profileForm!: FormGroup;
  view_flag = false;
  submitted = false;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileInputLabel: string | undefined;

  constructor( private router:Router,private route: ActivatedRoute,private toaster:NotificationService,private auth: AuthService, private operationService: OperationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      if (data['viewUser']) {
        this.view_flag = true;
      }
      this.userID = data['viewUser'];
      this.getUserInfo()
        .subscribe(user => {
          this.buildForm();
        }, error => {
          // this.router.navigateByUrl('/dashboard');
        });
    });

  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.profileForm.get('aadhar')?.setValue(file);
  }

  buildForm() {
    this.profileForm = this.formBuilder.group(
      {
        fullname: [this.user[0].fullname || "", Validators.required],
        username: [
          this.user[0].username || "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: [this.user[0].email || "", [Validators.required, Validators.email]],
        password: [
          this.user[0].password || "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        aadhar: [ this.user[0].aadhar ? this.arrayBufferToBase64(this.user[0].aadhar.data.data) : '' ],
      }
    );
  }

  arrayBufferToBase64(buffer:any) {

    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  getUserInfo() {
    return new Observable(observer => {
      let data = { userID: this.userID }
      this.operationService.post('/profile', data,true,true)
        .subscribe((res: any) => {
          this.user = [...res.profile]
          // this.user.push(res.profile[0]);
          observer.next(this.user);
          observer.complete();

        }, (error: any) => {
          console.error('Error getting user', error);
          observer.error(error);
          observer.complete();
        });

    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }

    
    this.auth.userUpdate({...this.profileForm.value,userID:this.userID},this.profileForm.get('aadhar')?.value).subscribe(
      (res: any) => {
        console.log("succes",res)
        if (res.status === 200) {
          this.toaster.showSuccess('User updated succesfully!!!', 'Success');
          setTimeout(() => {
            // window.location.reload();
            this.ngOnInit();
          },1000)
        } 
       
      },
      (error: any) => {
          this.toaster.showError('Something went wrong. Try Again!!!', 'Error')
      }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl, {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
}
