import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  breakpoint:any='';


  title = 'user-management';
  menuData = [
    {
      class: 'white-color',
      label: 'Send Money',
      link: ''
    },
    {
      class: 'white-color',
      label: 'Register',
      link: 'registration'
    },
    {
      class: 'white-color',
      label: 'Login',
      link: ''
    }
  ]

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3;
    console.log('ngOnInit',this.breakpoint)
  }
  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3;
    console.log('onResize',this.breakpoint)
  }
}
