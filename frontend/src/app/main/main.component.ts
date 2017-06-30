import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'muse-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Projects',
      route: '/projects',
      icon: 'dashboard',
    },
  ];

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['/login']);
  }
}
