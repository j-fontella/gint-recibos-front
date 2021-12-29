import { Component, OnInit } from '@angular/core';
import {PacienteService} from "../../service/paciente.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {EnderecoService} from "../../service/endereco.service";

@Component({
  selector: 'app-paciente-detalha',
  templateUrl: './paciente-detalha.component.html',
  styleUrls: ['./paciente-detalha.component.scss']
})
export class PacienteDetalhaComponent implements OnInit {
  public paciente : any
  constructor(
    public pacienteService : PacienteService,
    public utils : UtilsService,
    public auth : AuthService,
    private authService: AuthService,
    private route : Router,
    private enderecoService : EnderecoService
  ){}

  ngOnInit(): void {
    let rota : any = this.route
    if(rota.lastSuccessfulNavigation.extras.state.prk){
       this.paciente = rota.lastSuccessfulNavigation.extras.state;
    }
  }


  public redirecionarPacientes(){
    this.route.navigate(["pacientes"])
  }

  public getEnderecoPorCEP(){
    let cep = document.querySelector("#cep") as HTMLInputElement;
    let logradouro = document.querySelector("#logradouro") as HTMLInputElement;
    let bairro = document.querySelector("#bairro") as HTMLInputElement;
    let cidade = document.querySelector("#cidade") as HTMLInputElement;
    let uf = document.querySelector("#uf") as HTMLInputElement;
    if(cep && cep.value){
      this.enderecoService.getEnderecoPorCep(cep.value).subscribe(data =>{
        let endereco : any = data
        if(endereco.erro){
          alert("CEP inválido");
          return;
        }
        bairro.value = endereco.bairro
        cidade.value = endereco.localidade
        uf.value = endereco.uf
        logradouro.value = endereco.logradouro
      },error => {
        console.log(error)
      })
    }

  }

  public atualizarPaciente(){
    this.authService.isAutenticado();
    let nomeInput = document.querySelector("#nome") as HTMLInputElement;
    let enderecoInput = document.querySelector("#endereco") as HTMLInputElement;
    let cpfInput = document.querySelector("#cpf") as HTMLInputElement;
    let cepInput = document.querySelector("#cep") as HTMLInputElement;
    let logradouroInput = document.querySelector("#logradouro") as HTMLInputElement;
    let numeroInput = document.querySelector("#numero") as HTMLInputElement;
    let complementoInput = document.querySelector("#complemento") as HTMLInputElement;
    let bairroInput = document.querySelector("#bairro") as HTMLInputElement;
    let cidadeInput = document.querySelector("#cidade") as HTMLInputElement;
    let ufInput = document.querySelector("#uf") as HTMLInputElement;
    let frkUsuario = this.auth.getPrkUsuario();
    if(nomeInput && cepInput && nomeInput.value && cepInput.value && cpfInput && cpfInput.value
      && logradouroInput && logradouroInput.value
      && numeroInput && numeroInput.value
      && bairroInput && bairroInput.value
      && cidadeInput && cidadeInput.value
      && ufInput && ufInput.value){
      let nome = nomeInput.value
      let cpf = cpfInput.value
      let cep = cepInput.value
      let logradouro = logradouroInput.value
      let numero = numeroInput.value
      let complemento = complementoInput.value.length > 0 ? complementoInput.value : null;
      let bairro = bairroInput.value
      let cidade = cidadeInput.value
      let uf = ufInput.value
      let endereco = {
        "cep" : cep,
        "logradouro" : logradouro,
        "numero" : numero,
        "complemento" : complemento,
        "bairro" : bairro,
        "cidade" : cidade,
        "uf" : uf,
        "frkUsuario" : frkUsuario
      }
      this.pacienteService.atualizarPaciente(nome,endereco,cpf,frkUsuario).subscribe(data =>{
        alert("Paciente atualizado com sucesso!")
        this.route.navigate(["pacientes"])
      },error =>{
        this.authService.validateLoginError(error);
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "paciente")
        msgErro.innerHTML = msg ? msg : "Erro ao registrar paciente.";
      })

    }else{
      alert("Para efetuar um registro de conta você deve inserir nome, endereço e CPF válidos.");
      return;
    }
  }

}
