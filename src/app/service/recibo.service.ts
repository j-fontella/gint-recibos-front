import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

  apiUrl = "http://localhost:8081/recibo/";

  constructor(private httpClient : HttpClient, private authService : AuthService, private utils : UtilsService) { }
    public cadastrarRecibo(valor:string, frkPaciente:string, frkServico:string, data:string, cidade:string, tipoProcedimento:string, qtdTipoProcedimento : string, datasProcedimento : any, observacao : string | null){
      let token = this.authService.getToken()
      let frkUsuario = this.authService.getPrkUsuario();
      let httpOptions = {
        headers : new HttpHeaders({
          'Content-Type' : 'application/json',
          "token" : token
        })
      };
      let uri = this.apiUrl + "registrar/"
      return this.httpClient.post(uri,
                            {
                                  "valor" : valor,
                                  "frkUsuario" : frkUsuario,
                                  "frkPaciente" : frkPaciente,
                                  "frkServico" : frkServico,
                                  "data" : data,
                                  "cidade" : cidade,
                                  "tipoProcedimento" : tipoProcedimento,
                                  "qtdTipoProcedimento" : qtdTipoProcedimento,
                                  "datasProcedimento" : datasProcedimento,
                                  "observacao" : observacao
                                  }
                                  ,httpOptions)
    }

  public getRecibosPorUsuario (prk:String){
    let token = this.authService.getToken()
    let idus = this.authService.getPrkUsuario();
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + `getRecibosPorUsuario?prk=${prk}&idus=${idus}`
    return this.httpClient.get(uri ,httpOptions)
  }

  public getTotalAnual (){
    let token = this.authService.getToken()
    let prk = this.authService.getPrkUsuario();
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + `calcularImpostoAnualPF?prk=${prk}`
    return this.httpClient.get(uri ,httpOptions)
  }

  public getRecibosPorPaciente (prk:number){
    let token = this.authService.getToken()
    let idus = this.authService.getPrkUsuario();
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token
      })
    };
    let uri = this.apiUrl + `getRecibosPorPaciente?prk=${prk}&idus=${idus}`
    return this.httpClient.get(uri ,httpOptions)
  }

  public imprimirRecibo (prksRecibo : any, prkUsuario :any){
    let token = this.authService.getToken()
    let httpOptions = {
      responseType: 'blob' as 'json',
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        "token" : token,
      })
    };


    let uri = this.apiUrl + `gerarRecibo`

    let body = {"prksRecibo" : prksRecibo, "prkUsuario" : prkUsuario};
    return this.httpClient.post(uri,body,httpOptions)
  }

}
