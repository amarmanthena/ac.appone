import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  modalValues: ModalModel = new ModalModel();

  constructor(
    private dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.modalValues = data.modalValues;
    dialogRef.disableClose = true;
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}

export class ModalModel {
  titleIcon: string;
  title: string;
  content: string;
  cancelButtonText: string;
  cancelReturnValue: string;
  confirmButtonText: string;
  confirmReturnValue: string;
  okButtonText: string;
  okReturnValue: string;
}

