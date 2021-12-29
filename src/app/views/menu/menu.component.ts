import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
import {ServicoService} from "../../service/servico.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private route: Router, private authService : AuthService, private servicoService : ServicoService) { }
  public nome = this.authService.getNomeUsuario()
  ngOnInit(): void {

  }

  public redirecionarPacientes(){
    this.route.navigate(["pacientes"])
  }

  public redirecionarPerfil(){
    this.route.navigate(["usuario-detalha"])
  }

  public redirecionarServicos(){
    this.route.navigate(["servicos"])
  }

  public redirecionarRecibos(){
    this.route.navigate(["recibos"])
  }

  public logout() {
    sessionStorage.removeItem("ust");
    this.route.navigate([""])
  }
}
