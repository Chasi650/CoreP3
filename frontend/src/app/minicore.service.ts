import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MinicoreService {

  URL_API = 'http://localhost:4000/UsersProm';
  URL_API_GetUsers  = 'http://localhost:4000/Users';
  URL_API_GetNotas = 'http://localhost:4000/Notas';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<[]>(this.URL_API_GetUsers);
  }

  getNotas(){
    return this.http.get<[]>(this.URL_API_GetNotas);
  }

  getUsersProm(){
    return this.http.get<[]>(this.URL_API);
  }
}
