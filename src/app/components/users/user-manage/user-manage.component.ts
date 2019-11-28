import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserHttpService } from 'src/app/core/http-services/user-http.service';
import { UserDto } from 'src/app/core/models';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  public userForm: FormGroup;
  public user: UserDto;

  constructor(
    private userHttpService: UserHttpService,
    private dialogRef: MatDialogRef<UserManageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userdata: UserDto }
  ) { }

  ngOnInit() {
    this.user = this.data.userdata;
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required])
    });

    if (this.user !== null) {
      this.userForm.patchValue({
        firstName: this.user.firstName,
        surname: this.user.surname
      });
    }
  }

  public validateField = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  saveUser(form) {
    if (this.user === null) {
      this.addUser(form);
    } else {
      this.updateUser(form);
    }
  }

  addUser(form) {
    this.userHttpService.addUser(form).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  updateUser(form) {
    const user = new UserDto(
      {
        id: this.user.id,
        firstName: form.firstName,
        surname: form.surname
      });
    this.userHttpService.updateUser(user).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
