import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  matGridCol: any = '';
  isLogin: boolean = false;
  sessionStorageLogin: string = 'unknown';

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    if (sessionStorage.getItem("email")) {
      this.isLogin = true
    }
    this.matGridCol = (window.innerWidth <= 768) ? 1 : 3;
  }

  onResize(event: any) {
    this.matGridCol = (event.target.innerWidth <= 768) ? 1 : 3;
  }

  onLogout() {
    this.sessionStorageLogin = 'clear'
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
