import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { PredictService } from '../predict.service';
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component'

export interface PetBreedCode {
  value: number;
  viewValue: string;
}

export interface PetGenderCode {
  value: number;
  viewValue: string;
}

@Component({
  templateUrl: "./predict-create.component.html",
  styleUrls: ["./predict-create.component.css"]
})
export class PredictCreateComponent implements OnInit{
  isLoading = false;
  imageSrc: string = 'assets/sample.png';
  filename: string;
  selectedImg = false;
  imageType : string;
  predictCreateForm: FormGroup;
  probabilities: number[] = [];
  predictedLabels : string[] = [];
  predictResult : string;
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
    private authService : AuthService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {}
  
  ngOnInit() {
    let data = this.authService.getFormData();
    // console.log(data)
    this.predictCreateForm = this.formBuilder.group({
      petOwner: [data, Validators.required],
      petName: ['', Validators.required],
      petBreedCode: ['', Validators.required],
      petBirthday: ['', Validators.required],
      petGenderCode: ['', Validators.required],
    });
  }

  onAnaylze() {
    let form = this.predictCreateForm;

    const dataWithBase64 = this.imageSrc.replace('data:'+this.imageType+';base64,', '');
    const dataFileName = this.filename;
    const petBirthday = new Date(this.predictCreateForm.value.petBirthday).getTime()/1000;
    this.isLoading = true;

    this.predictService.createPredict(form.value.petOwner, form.value.petName, parseInt(form.value.petBreedCode), 
        petBirthday, parseInt(form.value.petGenderCode), dataWithBase64, dataFileName)
    .subscribe((res)=> {
      console.log(res) 
      let result = res['result'];
      if(result){
        if(result['probabilities'].length == 0){
          this.predictedLabels = ["解析できませんでした。再撮影してください"];
          this.predictResult = "解析できませんでした。再撮影してください"
        }else{
          this.probabilities = result['probabilities'];
          this.predictedLabels = result['predictedLabels'];
          console.log( result['probabilities'])
        }
        this.isLoading = false;
        // this.router.navigate(["/predict"]);
      }else{
        let errorCode = res['error']['code'];
        if(errorCode == 401){
          this.authService.clearAuthData();
          this.authService.saveFormData(form);
          this.router.navigate(['/login']);
        }
      }
      this.isLoading = false
    });
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file)
    if(!file){
      this.openDialog("Warning", "画像ファイルが存在しません");
      return;
    }
    this.filename = file.name;
    this.imageType = file.type;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.openDialog("Warning", "Invalid Format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.selectedImg = true;
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

