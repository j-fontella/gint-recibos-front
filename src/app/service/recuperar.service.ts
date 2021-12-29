import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {

  apiUrl = "http://localhost:8081/login/";

  constructor(private httpClient : HttpClient) { }

  public gerarToken(email : string){
    let uri = this.apiUrl + "esqueciSenha"
    return this.httpClient.post(uri, {"email" : email})
  }

  public recuperar(email : string, token : string, senha : string){
    let uri = this.apiUrl + "recuperar"
    return this.httpClient.post(uri, {"email" : email, "hash" : token, "senha" : senha})
  }

}
