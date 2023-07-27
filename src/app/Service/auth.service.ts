import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import jwt_decode, { JwtDecodeOptions } from "jwt-decode";
import { JwtPayload } from '../Models/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiBaseUrl;
  token: any = localStorage.getItem("accessToken");
  loggedIn: boolean = localStorage.getItem("accessToken") != null ? true : false;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Authentication/Login`, data);
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.loggedIn = false;
    location.reload();
  }

  getUserRole() {
    if (this.token != null) {
      let decodedToken: JwtPayload = jwt_decode(this.token)
      return decodedToken.AccessLevel;
    }
    return null;
  }
}