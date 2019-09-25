import {Component, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from "../auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit{
    username : string;
    isPredict = false;
    isHistory = false;
    
    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
        public route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit()  {
        this.username = this.authService.getUserName();
        if (this.router.url == "/predict"){
            this.isHistory = true;
        }else if(this.router.url == "/history"){
            this.isPredict = true;
        }else{
            this.isPredict = true;
            this.isHistory = true;
        }
    }

    onLogout() {
        this.openDialog("Confirm", "ログアウトしますか？");
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
                    this.authService.logout();
                }
            }
        );
    }
}