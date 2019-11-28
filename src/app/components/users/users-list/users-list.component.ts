import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDto } from 'src/app/core/models';
import { UserHttpService } from 'src/app/core/http-services/user-http.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { ModalModel, AlertModalComponent } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: UserDto[] = [];
  public isLoadingResults: boolean;
  public displayedColumns: string[];
  public displayNoRecords: boolean;

  dataSource = new MatTableDataSource<UserDto>(this.users);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private userHttpService: UserHttpService,
    private dialog: MatDialog
  ) {
    this.isLoadingResults = true;
    this.displayedColumns = ['id', 'firstName', 'surname', 'itemActions'];
  }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.userHttpService.getUsers().subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayNoRecords = (data.length === 0) ? true : false;
        this.isLoadingResults = false;
      });
  }

  openManageUserForm(user: UserDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.height = '350px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      userdata: user
    };
    const dialogRef = this.dialog.open(UserManageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (typeof data !== 'undefined') {
        this.getUsers();
      }
    });
  }

  deleteUserForm(user: UserDto) {
    const modalValues: ModalModel = new ModalModel();

    modalValues.titleIcon = 'delete';
    modalValues.title = 'Delete User';
    modalValues.content = 'Are you sure you want to delete the user?';
    modalValues.cancelButtonText = 'Cancel';
    modalValues.cancelReturnValue = 'Continue';
    modalValues.confirmButtonText = 'Delete';
    modalValues.confirmReturnValue = 'Confirm';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modalValues
    };
    const dialogRef = this.dialog.open(AlertModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'Confirm') {
          this.userHttpService.deleteuser(user.id).subscribe(result => {
            this.getUsers();
          });
        }
      },
      errorMessage => {
        if (errorMessage.error && errorMessage.error.errors) {
        }
      }
    );
  }

}
