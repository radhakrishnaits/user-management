import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ReceiversAPI {
    apiUrl: string = 'http://localhost:8080/user-management/v1/users/';
    userName = 'abcd@abcd.com';

    constructor(private http: HttpClient) { }

    getAllReceivers(): Observable<any> {
        return this.http.get(this.apiUrl + this.userName + '/beneficiary');
    }

    getReceiver(id: string): Observable<any> {
        return this.http.get(this.apiUrl + this.userName + '/beneficiary/' + id);
    }

    addReceiver(receiverDetails: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        const body = JSON.stringify(receiverDetails);
        return this.http.post(this.apiUrl + this.userName + '/beneficiary', body, options);
    }

    modifyReceiver(receiverDetails: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        const body = JSON.stringify(receiverDetails);
        return this.http.put(this.apiUrl + this.userName + '/beneficiary/' + receiverDetails.nickName, body, options);
    }

    deleteReceiver(id: string) {
        return this.http.delete(this.apiUrl + this.userName + '/beneficiary/' + id);
    }
}