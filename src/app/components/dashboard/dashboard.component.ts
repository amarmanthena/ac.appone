import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/core/http-services/user-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userCount: number;

  constructor(
    private router: Router,
    private userHttpService: UserHttpService
  ) {
    this.userCount = 0;
  }

  ngOnInit() {
    this.getUsersCount();
  }

  public getUsersCount() {
    this.userHttpService.getUsers().subscribe(data => {
      this.userCount = data.length;
    });
  }

  public ViewUsersList() {
    this.router.navigate([`/users`], );
  }

}
