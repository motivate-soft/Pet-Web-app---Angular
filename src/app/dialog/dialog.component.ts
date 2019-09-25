import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Dialog {
  title:string;
  msg: string;
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css']
  })
export class DialogComponent implements OnInit{

    title : string;
    msg : string;
    isConfirmDlg = true;
    constructor(
      private dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) {title, msg}: Dialog) {
        this.title = title;
        if (title == "Warning"){
          this.isConfirmDlg = false;
        }
        this.msg = msg;
      }
    
    ngOnInit() {
      
    }

    public ok(){
      this.dialogRef.close('ok');
    }
    public cancel(){
      this.dialogRef.close('cancel');
    }

}