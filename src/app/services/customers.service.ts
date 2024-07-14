import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { GetCustomers } from '../modals/get-customers';
import { GetTransactions } from '../modals/get-transactions';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<GetCustomers[]>(`${this.baseUrl}/customers`);
  }

  getAllTransactions() {
    return this.http.get<GetTransactions[]>(`${this.baseUrl}/transactions`);
  }

}
