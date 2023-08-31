import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  matGridCol:any='';
  isLogin:boolean = false;
  sessionStorageLogin:string = 'unknown';
  ngOnInit(): void {
    if (sessionStorage.getItem("email")) {
      this.isLogin = true
    }
    this.matGridCol = (window.innerWidth <= 768) ? 1 : 3
  }
  onResize(event:any) {
    const w = event.target as Window;
    this.matGridCol = (w.innerWidth <= 768) ? 1 : 3;
  }
  onLogout() {
    this.sessionStorageLogin = 'clear'
    sessionStorage.clear()
    window.location.href='/'
  }
}
