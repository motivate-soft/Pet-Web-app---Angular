import { Component, OnInit } from "@angular/core";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';  
import { DialogComponent } from '../../dialog/dialog.component'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PredictService } from '../predict.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as moment from 'moment';

export interface PetBreedCode {
    value: number;
    viewValue: string;
}

export interface PetGenderCode {
    value: number;
    viewValue: string;
}

@Component({
  templateUrl: "./predict-detail.component.html",
  styleUrls: ["./predict-detail.component.css"]
})
export class PredictDetailComponent implements OnInit {
    isLoading = false;
    analyzeDate : string;
    imageSrc: string = 'assets/sample.png';
    filename: string;
    selectedImg = false;
    imageType : string;
    sub : Subscription;
    predictId : string;
    predictDetailForm: FormGroup;
    
    petBreedCodes: PetBreedCode[] = [
        {value: 0, viewValue: '犬種不明'},
        {value: 1,	viewValue: 'トイプードル'},
        {value: 2,	viewValue: 'チワワ'},
        {value: 3,	viewValue: '柴犬'},
        {value: 4,	viewValue: 'ポメラニアン'},
        {value: 5,	viewValue: 'ダックスフント'},
        {value: 6,	viewValue: 'フレンチブルドッグ'},
        {value: 7,	viewValue: 'ゴールデンレトリバー'},
        {value: 8,	viewValue: 'ロングコートチワワ'},
        {value: 9,	viewValue: 'タイニープードル'},
        {value: 10, viewValue: 'ティーカッププードル'},
        {value: 11,	viewValue: 'ミニチュアダックス'},
        {value: 12,	viewValue: 'ミニチュアシュナウザー'},
        {value: 13,	viewValue: 'ヨークシャーテリア'},
        {value: 14,	viewValue: 'スムースコートチワワ'},
        {value: 15,	viewValue: 'ペキニーズ'},
        {value: 16,	viewValue: 'カニンヘンダックス'},
        {value: 17,	viewValue: 'シーズー'},
        {value: 18,	viewValue: 'パピヨン'},
        {value: 19,	viewValue: 'コーギー'},
        {value: 20,	viewValue: '豆柴'},
        {value: 21,	viewValue: 'パグ'},
        {value: 22,	viewValue: 'ボーダーコリー'},
        {value: 23,	viewValue: 'マルチーズ'},
        {value: 24,	viewValue: 'キャバリア'},
        {value: 25,	viewValue: 'シェットランドシープドッグ'},
        {value: 26,	viewValue: 'ビーグル'},
        {value: 27,	viewValue: 'ビションフリーゼ'},
        {value: 28,	viewValue: 'ラブラドールレトリバー'},
        {value: 29,	viewValue: 'イタリアングレーハウンド'},
        {value: 30,	viewValue: 'ジャックラッセルテリア'},
        {value: 31,	viewValue: 'ミニチュアピンシャー'},
        {value: 1000,	viewValue: '猫種不明'},
        {value: 1001,	viewValue: 'ミックス種'},
        {value: 1002,	viewValue: 'スコティッシュフォールド'},
        {value: 1003,	viewValue: '日本猫'},
        {value: 1004,	viewValue: 'アメリカンショートヘア'},
        {value: 1005,	viewValue: 'マンチカン'},
        {value: 1006,	viewValue: 'ノルウェージャンフォレストキャット'},
        {value: 1007,	viewValue: 'ブリティッシュショートヘア'},
        {value: 1008,	viewValue: 'メインクーン'},
        {value: 1009,	viewValue: 'ロシアンブルー'},
        {value: 1010,	viewValue: 'ラグドール'},
        {value: 1011,	viewValue: 'ベンガル猫'},
        {value: 1012,	viewValue: 'ペルシャ猫'},
        {value: 1013,	viewValue: 'ソマリ'},
        {value: 1014,	viewValue: 'アメリカンカール'},
        {value: 1015,	viewValue: 'ミヌエット'},
        {value: 1016,	viewValue: 'アビシニアン'},
        {value: 1017,	viewValue: 'チンチラ'},
        {value: 1018,	viewValue: 'エキゾチックショートヘア'},
        {value: 1019,	viewValue: 'ラガマフィン'},
        {value: 1020,	viewValue: 'シンガプーラ'},
        {value: 1021,	viewValue: 'エキゾチック'},
        {value: 1023,	viewValue: 'スコティッシュフォールドロングヘア'},
        {value: 1024,	viewValue: 'シャルトリュー'},
        {value: 1025,	viewValue: 'トンキニーズ'},
        {value: 1026,	viewValue: 'セルカークレックス'},
        {value: 1027,	viewValue: 'ヒマラヤン'},
        {value: 1028,	viewValue: 'シャム猫'},
        {value: 1029,	viewValue: 'サイベリアン'},
        {value: 1030,	viewValue: 'オシキャット'},
        {value: 1031,	viewValue: 'キンカロー'}
      ];
    
    petGenderCodes: PetGenderCode[] = [
        {value: 1, viewValue: 'オス'},
        {value: 2, viewValue: 'メス'},
    ]
    constructor(
        public predictService: PredictService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        ) {}

    ngOnInit() {
        this.isLoading = true;
        this.route.params
        .subscribe(
        (params: Params) => {
            this.predictId = params.id;
        }
        );
        this.predictDetailForm = this.formBuilder.group({
            petOwner: ['', Validators.required],
            petName: ['', Validators.required],
            petBreedCode: ['', Validators.required],
            petBirthday: ['', Validators.required],
            petGenderCode: ['', Validators.required],
        });
        
        this.predictService.loadPredict(this.predictId)
        .subscribe((res) => {
            let result = res['result'];
            this.analyzeDate = this.getEventDate(result['analyzeDate']);
            this.predictDetailForm.setValue({
                petOwner: result['petOwner'],
                petName: result['petName'],
                petBreedCode: result['petBreedCode'],
                petBirthday: moment.unix(result['petBirthday'])['_d'],
                petGenderCode: result['petGenderCode'],
            });
            this.filename = result['dataFileName'];
            let fileName = this.filename;
            let ext = fileName.substr(fileName.lastIndexOf('.') + 1);
            this.imageSrc = "data:image/"+ext+";base64," + result['dataWithBase64'];
            this.isLoading = false;
        });
    }
    
    get f() { return this.predictDetailForm.controls; }

    onPredictUpdate() {
        let id = this.predictId;
        let birthday = new Date(this.f.petBirthday.value).getTime()/1000;
        this.predictService.updatePredict(id, this.f.petOwner.value, this.f.petName.value, this.f.petBreedCode.value, 
            birthday, this.f.petGenderCode.value)
        .subscribe((res)=> {
            let result = res['result']
            if(result){
                this.router.navigate(["/history"]);
            }else{
                let errorMsg = res['error']['message']
                this.openDialog("Warning", errorMsg);
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

