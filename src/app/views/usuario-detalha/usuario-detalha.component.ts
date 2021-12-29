import { Component, OnInit } from '@angular/core';
import {PacienteService} from "../../service/paciente.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Usuario} from "../../models/usuario";
import {UserService} from "../../service/user.service";
import {EnderecoService} from "../../service/endereco.service";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-usuario-detalha',
  templateUrl: './usuario-detalha.component.html',
  styleUrls: ['./usuario-detalha.component.scss']
})
export class UsuarioDetalhaComponent implements OnInit {
  public usuario : any;
  constructor(
    public userService : UserService,
    private route: Router,
    private authService : AuthService,
    private utils : UtilsService,
    private enderecoService : EnderecoService
  ){}
  ngOnInit(): void {
    this.userService.getUserByPrk().subscribe(data =>{
      this.usuario = data;
      console.log(data)

    },error => {
      this.authService.validateLoginError(error);
      console.log(error)
    })
  }

  public redirecionarGeral(){
    this.route.navigate(["menu"])
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

  public salvarUsuario(){
    let usuarioInput = document.querySelector("#usuario") as HTMLInputElement;
    let senhaInput = document.querySelector("#senha") as HTMLInputElement;
    let novaSenhaInput = document.querySelector("#novasenha") as HTMLInputElement;
    let nomeInput = document.querySelector("#nome") as HTMLInputElement;
    let docregistroInput = document.querySelector("#docregistro") as HTMLInputElement;
    let conselhoInput = document.querySelector("#conselho") as HTMLInputElement;
    let numeroconselhoInput = document.querySelector("#numeroconselho") as HTMLInputElement;
    let profissaoInput = document.querySelector("#profissao") as HTMLInputElement;
    let cepInput = document.querySelector("#cep") as HTMLInputElement;
    let logradouroInput = document.querySelector("#logradouro") as HTMLInputElement;
    let numeroInput = document.querySelector("#numero") as HTMLInputElement;
    let complementoInput = document.querySelector("#complemento") as HTMLInputElement;
    let bairroInput = document.querySelector("#bairro") as HTMLInputElement;
    let cidadeInput = document.querySelector("#cidade") as HTMLInputElement;
    let ufInput = document.querySelector("#uf") as HTMLInputElement;
    let frkUsuario = this.authService.getPrkUsuario();
    if(senhaInput && senhaInput.value){
      let usuario = usuarioInput.value
      let senha = senhaInput.value
      let novaSenha = novaSenhaInput ? novaSenhaInput.value : null
      let nome = nomeInput.value
      let docregistro = docregistroInput.value
      let conselho = conselhoInput.value
      let numeroconselho = numeroconselhoInput.value
      let cep = cepInput.value
      let logradouro = logradouroInput.value
      let numero = numeroInput.value
      let complemento = complementoInput.value
      let bairro = bairroInput.value
      let cidade = cidadeInput.value
      let uf = ufInput.value
      let profissao = profissaoInput.value
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
      this.userService.atualizarUsuario(nome,usuario,senha,endereco,docregistro,conselho,numeroconselho,profissao,novaSenha).subscribe(data =>{
        alert("Perfil atualizado com sucesso.")
        this.route.navigate(['menu'])
      },error =>{
        this.authService.validateLoginError(error);
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "usuário", true)
        msgErro.innerHTML = msg ? msg : "Erro ao atualizar perfil.";
      })

    }else{
      alert("Para atualizar o registro você precisa inserir sua senha.");
      return;
    }
  }

}
