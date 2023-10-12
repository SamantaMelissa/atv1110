import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  url = "http://localhost:3000/login"

  login(usuario: User): Observable<any>{
    // O stringify, nessa situação está tranformando o valor em um valor JSON. 
    return this.httpClient.post(this.url, JSON.stringify(usuario), {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      // O uso do observe: "response" faz com que nosso retorno tenha as informações do cabeçalho e o status code. 
      observe: "response"
    })

  }
  
}
