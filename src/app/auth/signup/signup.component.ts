import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component'
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit{
  isLoading = false;
  signupForm: FormGroup;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const isAuth = this.authService.getIsAuth();
    if (isAuth) {
      this.router.navigate(['/predict']);
    }
  }
  
  onSignup(): void {    
    let form = this.signupForm;
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
    this.authService.addUser(form.value.username, form.value.password).subscribe((res)=> {
      this.isLoading = false
      let result = res['result'];
      if(result){
        this.openDialog("Confirm", "ユーザ登録が成功しました");
      }else{
        let errorMsg = res['error']['message']
        this.openDialog("Warning",errorMsg);
        return
      }
    });
  }

  openDialog(title : string, msg: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
        data: {
        title: title,
        msg: msg,
        },
        width: '350px'
    });
    dialogRef.afterClosed().subscribe(
      val => {
        if (val == "ok") {
          this.isLoading = true
          let form = this.signupForm;
          this.authService.login(form.value.username, form.value.password)
          .subscribe(
            res=>{
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
      }
    );
  }
}
