import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Paciente} from "../models/paciente";

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  apiUrl = "http://localhost:8081/servico/";

  constructor(private httpClient : HttpClient, private authService : AuthService) { }

  public getServicosPorUsuario (prk:String){
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + `getServicosPorUsuario?prk=${prk}`
    return this.httpClient.get(uri ,httpOptions)
  }

  public cadastrarServico(nome:String){
    let token = this.authService.getToken()
    let frkUsuario = this.authService.getPrkUsuario();
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + "registrar/"
    return this.httpClient.post(uri, {"nome" : nome, "frkUsuario" : frkUsuario},httpOptions)
  }


  public atualizarServico(nome:String, frkUsuario:String, prk : Number){
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + "atualizar/"
    return this.httpClient.post(uri, {"nome" : nome, "frkUsuario" : frkUsuario, "prk" : prk},httpOptions)
  }
}
