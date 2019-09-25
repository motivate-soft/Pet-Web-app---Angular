import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PredictData } from "./predict-data.model";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class PredictService {
  private predict: PredictData;
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

  createPredict(petOwner: string, petName: string, petBreedCode: number, petBirthday: number, petGenderCode: number, dataWithBase64: string, dataFileName: string) {
    const predictData: PredictData = { petOwner: petOwner, petName: petName, petBreedCode: petBreedCode, petBirthday: petBirthday, 
      petGenderCode: petGenderCode, dataWithBase64: dataWithBase64, dataFileName: dataFileName};
    
    const postData = {
      "jsonrpc": "2.0",
      "method": "predict",
      "params": {
        "petOwner": predictData.petOwner,
        "petName": predictData.petName,
        "petBreedCode": predictData.petBreedCode, 
        "petBirthday": predictData.petBirthday, 
        "petGenderCode": predictData.petGenderCode, 
        "dataWithBase64": predictData.dataWithBase64, 
        "dataFileName": predictData.dataFileName
      },
      "id": 3
    }
    return this.http
      .post(`${environment.apiUrl}`, postData)
  }

  loadHistory(position: number, count: number) {
    const postData = {
      "jsonrpc": "2.0",
      "method": "predictHistory",
      "params": {
        "position": position,
        "count": count
      },
      "id": 4
    }
    return this.http.post(`${environment.apiUrl}`, postData)
  }

  loadPredict(predictId: string) {
    const postData = {
      "jsonrpc": "2.0",
      "method": "predictHistoryDetail",
      "params": {
        "id": predictId
      },
      "id": 5
    }
    return this.http
      .post(`${environment.apiUrl}`, postData)
      .pipe(map(response => {
        return response
      }));
  }

  updatePredict(id: string, petOwner: string, petName: string, petBreedCode: number, petBirthday: number, petGenderCode: number) {
    const postData = {
      "jsonrpc": "2.0",
      "method": "updatePredictHistoryDetail",
      "params": {
        "id": id,
        "petOwner": petOwner,
        "petName": petName,
        "petBreedCode": petBreedCode,
        "petBirthday" : petBirthday,
        "petGenderCode": petGenderCode
      },
      "id": 6
    }
    return this.http
      .post(
        `${environment.apiUrl}`,
        postData
      )
  }
  
}
