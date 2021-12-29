import { Component, OnInit } from '@angular/core';
import {PacienteService} from "../../service/paciente.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ServicoService} from "../../service/servico.service";

@Component({
  selector: 'app-servico-detalha',
  templateUrl: './servico-detalha.component.html',
  styleUrls: ['./servico-detalha.component.scss']
})
export class ServicoDetalhaComponent implements OnInit {

  public servico : any
  constructor(
    public servicoService : ServicoService,
    public utils : UtilsService,
    public auth : AuthService,
    private authService: AuthService,
    private route : Router,
  ){}

  ngOnInit(): void {
    let rota : any = this.route
    if(rota.lastSuccessfulNavigation.extras.state.nome){
      this.servico = rota.lastSuccessfulNavigation.extras.state;
    }
  }

  public atualizarServico(){
    this.authService.isAutenticado();
    let nomeInput = document.querySelector("#nome") as HTMLInputElement;
    let frkUsuario = this.auth.getPrkUsuario();
    if(nomeInput && nomeInput.value){
      let nome = nomeInput.value
      this.servicoService.atualizarServico(nome,frkUsuario,this.servico.prk).subscribe(data =>{
        alert("Serviço com sucesso!")
        this.route.navigate(["servicos"])
      },error =>{
        this.authService.validateLoginError(error);
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "serviço")
        msgErro.innerHTML = msg ? msg : "Erro ao registrar serviço.";
      })

    }else{
      alert("Para efetuar um registro de conta você deve inserir nome, endereço e CPF válidos.");
      return;
    }
  }

  public redirecionarServicos(){
    this.route.navigate(["servicos"])
  }

}
