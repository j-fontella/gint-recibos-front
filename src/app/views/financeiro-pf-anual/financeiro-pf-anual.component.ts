import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ReciboService} from "../../service/recibo.service";
import {Recibo} from "../../models/recibo";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-financeiro-pf-anual',
  templateUrl: './financeiro-pf-anual.component.html',
  styleUrls: ['./financeiro-pf-anual.component.scss']
})
export class FinanceiroPfAnualComponent implements OnInit {
  public totalAnual : any
  public aliquota : any
  public faixa : any
  public limiteFaixa : any
  public valorEmitido : any
  public limiteAEmitir : any
  public anoAtual = new Date().getFullYear();
  constructor(private route: Router,
              private authService : AuthService,
              private reciboService : ReciboService,
              public utils : UtilsService) {

  }

  ngOnInit(): void {
    this.reciboService.getTotalAnual().subscribe(data =>{
      let ret : any = data
      this.aliquota = ret.aliquota;
      this.faixa = ret.faixa;
      if(this.faixa != "Quinta"){
        console.log(ret)
        this.limiteFaixa = this.utils.formataNumeroDuasCasasComMoeda(ret.limiteFaixa)
        this.limiteAEmitir = this.utils.formataNumeroDuasCasasComMoeda(ret.limiteFaixa - ret.valorEmitido)
      }else{
        this.limiteFaixa = "-";
        this.limiteAEmitir = "-";
      }
      this.totalAnual = this.utils.formataNumeroDuasCasasComMoeda(ret.totalAnual);

      this.valorEmitido = this.utils.formataNumeroDuasCasasComMoeda(ret.valorEmitido);
    },error => {
      this.authService.validateLoginError(error);
    })
  }

  public redirecionaGestao(){
    this.route.navigate(['gestao-financeira'])
  }




}
