import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { first } from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component'
import { AuthService } from "../auth.service";
import { MessageService } from '../../app.service';
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  isLoading = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  
  ngOnInit() {
      const isAuth = this.authService.getIsAuth();
      if (isAuth) {
        this.router.navigate(['/predict']);
      }
      const data = this.authService.getFormData();
      console.log(data);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      if (form.value.username && !form.value.password){
        this.openDialog('Warning', "ユーザ名称が未入力です");
        return
      }else if(!form.value.username && form.value.password){
        this.openDialog('Warning', "パスワードが未入力です");
        return
      }else{
        this.openDialog('Warning', "ユーザ名称が未入力です パスワードが未入力です");
        return
      }
    }

    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password)
    .subscribe(
      res=>{
        console.log(res)
        this.isLoading = false;
        let result = res['result'];
        if (result){
          this.router.navigate(["/predict"]);
        }else{
          let errorMsg = res['error']['message'];
          this.openDialog("Warning", errorMsg);
        }
      }
    );
  }

  openDialog(title : string, msg: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        msg: msg,
      },
      width: '350px'
    });
  }
}
