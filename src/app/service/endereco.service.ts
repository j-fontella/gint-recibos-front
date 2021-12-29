import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private httpClient : HttpClient) { }

  public getEnderecoPorCep(cep:string){
    let endpoint = `https://viacep.com.br/ws/${cep}/json/`
    return this.httpClient.get(endpoint)
  }
}
