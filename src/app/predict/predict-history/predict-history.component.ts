import {Component, OnInit} from '@angular/core';

import { PredictService } from '../predict.service';
import { AuthService } from "../../auth/auth.service";
import { PredictData, PredictDataObj } from '../predict-data.model';
import { Router } from "@angular/router";

import { Subscription } from 'rxjs';

@Component({
  selector: 'predict-history',
  templateUrl: 'predict-history.component.html',
  styleUrls: ['predict-history.component.css'],
})
export class PredictHistoryComponent implements OnInit {
    predicts : PredictData[] = [];
    position = 0;
    count = 20;
    subscription: Subscription;

    constructor(
      public predictService: PredictService,
      public authService : AuthService,
      private router: Router,

    ){}

    ngOnInit() {
      this.getHistory()
      this.authService.getIsAuth()
    }
    getHistory(){
      this.predictService.loadHistory(this.position, this.count)
      .subscribe((res) => {
        console.log(res);
        let result = res['result'];
        if (result){
          const data = result['histories'];
          for(var key in data){
            if(data.hasOwnProperty(key)) {
              var value = data[key];
              let _analyzeDate = value['analyzeDate']
              let analyzeDate = this.getEventDate(_analyzeDate);
              value['analyzeDate'] = analyzeDate;
              // value['petGenderCode'] = "petGenderCode";
              ///
              // let id = value['id']
              // this.predictService.loadPredict(id)
              // .subscribe((res) => {
                
              //   let petGenderCode = res['result']['petGenderCode'];
              //   console.log(petGenderCode)
              //   value['petGenderCode'] = petGenderCode;
              //   // data.forEach(item => {
              //         this.predicts.push(new PredictDataObj(value));
              //       // });
              // });
            }
          }
          console.log('OK')
          if (data != undefined){
            data.forEach(item => {
              this.predicts.push(new PredictDataObj(item));
            });
          }
        }else{
          let error = res['error']
          if(error['code'] == 401){
            this.authService.clearAuthData();
            this.router.navigate(['/login']);
          }
        }
      });
    }
    onScroll() {
      this.position = this.position + this.count;
      this.getHistory()
    }

    getEventDate(event_date) {
      let event_timezone_offset = new Date().getTimezoneOffset();
      let d = new Date(event_date*1000);
      let timeCorrection = -480 - event_timezone_offset;
      d.setMinutes(d.getMinutes() + timeCorrection);
      let hrs = "0" + d.getHours();
      let min ="0" + d.getMinutes();
      
      return `${d.getFullYear()}-${d.getMonth() + 1 }-${d.getDate()} `
              + `${hrs.substr(-2)}:${min.substr(-2)}`
    }
}