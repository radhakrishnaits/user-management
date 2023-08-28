import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TransactionHistoryAPI {
    apiUrl: string = 'http://localhost:8080/user-management/v1';
    userName: string;

    constructor(private http: HttpClient) {
        // this.userName = sessionStorage.getItem('email') || '';
        this.userName = 'abcd@abcd.com';
    }

    getAllTransactions(): Observable<any> {
        return this.http.get(this.apiUrl + '/users/' + this.userName + '/txnhistory');
    }
}