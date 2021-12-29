import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ServicoService} from "../../service/servico.service";
import {Servico} from "../../models/servico";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  constructor(
    public servicoService : ServicoService,
    private route: Router,
    private authService : AuthService
  ){}

  public listaServicos: Servico[] = [];


  ngOnInit(): void {
    this.getServicos();
  }

  public getServicos(){
    let prkUsuario = this.authService.getPrkUsuario();
    this.servicoService.getServicosPorUsuario(prkUsuario).subscribe(data => {
      console.log(data)
      this.listaServicos = data as unknown as Servico[];
    },error => {
      this.authService.validateLoginError(error);
    })
  }

  public redirecionarGeral(){
    this.route.navigate(["menu"])
  }
  public redirecionarCadastroServicos(){
    this.route.navigate(["servicos-cadastro"])
  }

  public redirecionarServico(nome:String, prk:Number){
    this.route.navigate(["servicodetalhe"], { state: { "nome" : nome, "prk" : prk} })
  }

}
