import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    sendData(msg: string){
        this.subject.next(msg);
      }
    
    getData() : Observable<any> {
        return this.subject.asObservable();
    }
}