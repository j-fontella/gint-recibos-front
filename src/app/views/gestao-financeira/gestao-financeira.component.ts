import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ReciboService} from "../../service/recibo.service";

@Component({
  selector: 'app-gestao-financeira',
  templateUrl: './gestao-financeira.component.html',
  styleUrls: ['./gestao-financeira.component.scss']
})
export class GestaoFinanceiraComponent implements OnInit {

  constructor(private route: Router,
              private authService : AuthService,
              ) {

  }

  ngOnInit(): void {
  }

  public redirecionarGestao(){
    this.route.navigate(['recibos'])
  }

  public redirecionarPfAnual(){
    this.route.navigate(['financeiro-pf-anual'])

  }

}
