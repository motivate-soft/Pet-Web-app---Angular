export interface PredictData {
    petOwner: string;
    petName: string;
    petBreedCode: number;
    petBirthday: number;
    petGenderCode: number;
    dataWithBase64: string;
    dataFileName: string;
  }
  
  export class PredictDataObj implements PredictData {
    petOwner: string;
    petName: string;
    petBreedCode: number;
    petBirthday: number;
    petGenderCode: number;
    dataWithBase64: string;
    dataFileName: string;
  
    constructor(item?: PredictData) {
        if (item != undefined) {
            for (let key in item) {
                try { this[key] = item[key]; }
                catch (e) { }
            }
        }
    }
  }
  