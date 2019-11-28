import { Component, OnInit } from '@angular/core';
import { SideMenuItem } from './core/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'accela';
  public sideMenuItems: Array<SideMenuItem>;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.getUsersData();
    this.sideMenuItems = [
      {
        icon: 'dashboard',
        label: 'Home',
        routerLink: '/'
      },
      {
        icon: 'group',
        label: 'Users',
        routerLink: 'users'
      }
    ];
  }

  getUsersData() {
    this.http.get('http://localhost:3000/usersdata').subscribe(data => {
      console.log(data);
    });
  }
}
