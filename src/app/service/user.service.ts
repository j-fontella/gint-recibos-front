import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators'
import {AuthService} from "./auth.service";
import {UtilsService} from "./utils.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:8081/login/";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private httpClient : HttpClient, private authService : AuthService) { }

  public getUserByPrk(){
    let uri = this.apiUrl + "getUser"
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    return this.httpClient.post(uri, {"prk" : this.authService.getPrkUsuario()},httpOptions)
  }

  public atualizarUsuario(nome:String,
                          usuario:String,
                          senha:String,
                          endereco:any,
                          docregistro:String,
                          conselho:String,
                          numeroconselho:String,
                          profissao:String,
                          novaSenha:String | null
                          ){
    let uri = this.apiUrl + "atualizarUsuario/"
    let token = this.authService.getToken()
    let prk = this.authService.getPrkUsuario()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    return this.httpClient.post(uri,
      {
        "email" : usuario,
        "senha" : senha,
        "novaSenha" : novaSenha,
        "nome" : nome,
        "endereco" : endereco,
        "docregistro" : docregistro,
        "conselho" : conselho,
        "numeroConselho" : numeroconselho,
        "profissao" : profissao,
        "prk" : prk
      }, httpOptions)
  }

  public cadastrarUsuario(nome:String,
                          usuario:String,
                          senha:String,
                          endereco:any,
                          docregistro:String,
                          conselho:String,
                          numeroconselho:String,
                          profissao:String){
    let uri = this.apiUrl + "registrar/"
    return this.httpClient.post(uri,
                          {
                                "email" : usuario,
                                "senha" : senha,
                                "nome" : nome,
                                "endereco" : endereco,
                                "docregistro" : docregistro,
                                "conselho" : conselho,
                                "numeroConselho" : numeroconselho,
                                "profissao" : profissao
                              })
  }

  public logarUsuario(usuario:String, senha:String){
    let uri = this.apiUrl + "on/"
    return this.httpClient.post(uri, {"email" : usuario, "senha" : senha}).pipe(
      tap((loginResponse) => (this.authService.loginResponse = loginResponse))
    ).pipe(
      tap((loginResponse) => (sessionStorage.setItem("ust", JSON.stringify(loginResponse))))
    );
  }
}
