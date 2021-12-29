import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {Router} from "@angular/router";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse : Usuario | undefined | any


  constructor(private route : Router, private utils : UtilsService) { }

  public clearLogin(){
    this.loginResponse = undefined;
    sessionStorage.removeItem("ust")
    alert("Realize o login")
    return this.route.navigate(['']);
  }

  public validateLoginError(error:any){
    if(error.status == 401){
      this.clearLogin();
    }
  }


  public getUserSettings(){
    let tokenCache = JSON.parse(<string>sessionStorage.getItem("ust"))
    if(this.utils.isObject(tokenCache)){
      return tokenCache;
    }
    this.clearLogin();
  }

  public getToken() {
    let tokenCache = sessionStorage.getItem("ust")
    if (tokenCache != null) {
      tokenCache = JSON.parse(tokenCache)
      // @ts-ignore
      tokenCache = tokenCache.token;
      if (tokenCache) {
        return tokenCache;
      }
    }
    return "";

  }

  public getPrkUsuario() {
    let tokenCache = sessionStorage.getItem("ust")
    if (tokenCache != null) {
      tokenCache = JSON.parse(tokenCache)
      // @ts-ignore
      tokenCache = tokenCache.prk;
      if (tokenCache) {
        return tokenCache;
      }
    }
    return "";

  }

  public getNomeUsuario() {
    let tokenCache = sessionStorage.getItem("ust")
    if (tokenCache != null) {
      tokenCache = JSON.parse(tokenCache)
      // @ts-ignore
      tokenCache = tokenCache.nome;
      if (tokenCache) {
        return tokenCache;
      }
    }
    return "";

  }

  public isAutenticado(){
    let tokenCache = sessionStorage.getItem("ust")
    let prkCache = false;
    if (tokenCache != null) {
      tokenCache = JSON.parse(tokenCache)
      // @ts-ignore
      prkCache = tokenCache.prk
      // @ts-ignore
      tokenCache = tokenCache.token;
      if(tokenCache && prkCache){
        return true;
      }
    }
    sessionStorage.removeItem("ust")
    alert("Realize o login")
    return this.route.navigate(['']);
  }
}
