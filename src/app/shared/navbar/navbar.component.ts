import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,private route: ActivatedRoute) { }

    ngOnInit(): void {
      // this.route.queryParams.subscribe(data => {
      //   const navigationExtras: NavigationExtras = {
      //     queryParams: {
      //       'viewProfile': res.user._id
      //     }
      //   };
      //   setTimeout(()=>{
      //     this.router.navigate(['/dashboard'],navigationExtras);
      //   },2000)
      // });
  
    }

    cardsList(){
        this.router.navigate(['/cards']);
    }

    profile(){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'viewUser': localStorage.getItem('userID')
        }
      };
        this.router.navigate(['/dashboard'],navigationExtras);
    }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
