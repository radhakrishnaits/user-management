import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  breakpoint:any='';
  isLogin:boolean = false;
  title = 'user-management';
  menuData = [
    {
      class: 'white-color',
      label: 'Receivers',
      link: 'receivers'
    },
    {
      class: 'white-color',
      label: 'Transaction History',
      link: 'transaction-history'
    },
    {
      class: 'white-color',
      label: 'Registration',
      link: 'registration'
    },
    {
      class: 'white-color',
      label: 'Login',
      link: ''
    }
  ]
  ngOnInit(): void {
    if (sessionStorage.getItem("email")) {
      this.isLogin = true
    }
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3;
    console.log('ngOnInit',this.breakpoint)
  }
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3;
    console.log('onResize',this.breakpoint)
  }
  onLogout() {
    if(this.isLogin) {
      sessionStorage.clear()
      this.isLogin = false
      window.location.href='/'
    }
  }
}
