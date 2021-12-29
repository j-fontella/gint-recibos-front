import { Component, OnInit } from '@angular/core';
import {PacienteService} from "../../service/paciente.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ServicoService} from "../../service/servico.service";

@Component({
  selector: 'app-cadastra-servico',
  templateUrl: './cadastra-servico.component.html',
  styleUrls: ['./cadastra-servico.component.scss']
})
export class CadastraServicoComponent implements OnInit {

  constructor(
    public servicoService : ServicoService,
    public utils : UtilsService,
    public auth : AuthService,
    private authService: AuthService,
    private route : Router
  ){}

  ngOnInit(): void {
  }

  public redirecionarServicos(){
    this.route.navigate(["servicos"])
  }

  public registrarServico(){
    this.authService.isAutenticado();
    let nomeInput = document.querySelector("#nome") as HTMLInputElement;
    if(nomeInput && nomeInput.value){
      let nome = nomeInput.value
      this.servicoService.cadastrarServico(nome).subscribe(data =>{
        alert("Serviço registrado com sucesso!")
        this.route.navigate(["servicos"])
      },error =>{
        this.authService.validateLoginError(error);
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "serviço")
        msgErro.innerHTML = msg ? msg : "Erro ao registrar serviço.";
      })

    }else{
      alert("Para efetuar um registro de serviço você deve inserir nome válido");
      return;
    }
  }
}
