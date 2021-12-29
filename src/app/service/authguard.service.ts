import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private authService : AuthService) { }

  canActivate(): boolean {
    return <boolean>this.authService.isAutenticado();
  }

}
