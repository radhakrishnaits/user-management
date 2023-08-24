import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  urlType: any;

  constructor(private activatedRoutes: ActivatedRoute) {
    this.activatedRoutes.params.forEach((param) => {
      this.urlType = param['type'];
    })
  }
}
