import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Owner } from './Owner';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000'; // Base URL for API requests
  private user = new BehaviorSubject<any>(null);//User Subject for storing the user info

  constructor(private http: HttpClient) {}

  // Observable to get user info
  getUserInfo(): Observable<any> {
    return this.user.asObservable();
  }

  // Set user info
  setUserInfo(user: any): void {
    this.user.next(user);
  }

  // Login service
  login(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  // Report service
  report(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.apiUrl}/items`);
  }

  // Dashboard service
  dashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }

  // Graph data service
  graph(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/graph`);
  }

  // Submit form service
  submitForm(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, formData);
  }

  // Line chart data service
  linechart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/linechart`);
  }

  // Bar chart data service
  barchart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/barchart`);
  }
}
