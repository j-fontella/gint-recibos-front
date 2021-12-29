import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ServicoService} from "../../service/servico.service";
import {ReciboService} from "../../service/recibo.service";
import {Paciente} from "../../models/paciente";
import {Recibo} from "../../models/recibo";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.scss']
})
export class RecibosComponent implements OnInit {

  public listaRecibos: Recibo[] = [];


  constructor(private route: Router,
              private authService : AuthService,
              private reciboService : ReciboService) {

  }


  ngOnInit(): void {
    let prk = this.authService.getPrkUsuario()
    this.reciboService.getRecibosPorUsuario(prk).subscribe(data =>{
      console.log(data)
      this.listaRecibos = data as unknown as Recibo[];
      this.listaRecibos.forEach((recibo) =>{
        recibo.label = `${recibo.paciente} - R$${recibo.valor}`
      })
    },error => {
      this.authService.validateLoginError(error);
    })
  }

  public redirecionarCadastro(){
    this.route.navigate(["recibos-cadastro"])
  }

  public redirecionarMenu(){
    this.route.navigate(["menu"])
  }

  public gerarImpressao(){
    this.route.navigate(["imprimir"])
  }

  public redirecionarGestao(){
    this.route.navigate(["gestao-financeira"])
  }



}
