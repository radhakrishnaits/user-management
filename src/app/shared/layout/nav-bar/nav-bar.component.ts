import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  avatar:string = 'John Doe';
  menuData = [
    {
      class: 'white-color',
      label: 'Send Money',
      link:''
    },
    {
      class: 'white-color',
      label: 'Register',
      link:''
    },
    {
      class: 'white-color',
      label: 'Login',
      link:'/'
    }
  ]

}
