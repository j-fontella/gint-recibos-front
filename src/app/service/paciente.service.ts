import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  apiUrl = "http://localhost:8081/paciente/";



  constructor(private httpClient : HttpClient, private authService : AuthService) { }

  public getPacientesPorUsuario (prk:String){
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + `getPacientesPorUsuario?prk=${prk}`
    return this.httpClient.get(uri ,httpOptions)
  }


  public cadastrarPaciente(nome:String, endereco:any, cpf:String, frkUsuario:String){
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + "registrar/"
    return this.httpClient.post(uri, {"endereco" : endereco, "cpf" : cpf, "nome" : nome, "frkUsuario" : frkUsuario},httpOptions)
  }

  public atualizarPaciente(nome:String, endereco:any, cpf:String, frkUsuario:String){
    let token = this.authService.getToken()
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + "atualizar/"
    return this.httpClient.post(uri, {"endereco" : endereco, "cpf" : cpf, "nome" : nome, "frkUsuario" : frkUsuario},httpOptions)
  }

}
