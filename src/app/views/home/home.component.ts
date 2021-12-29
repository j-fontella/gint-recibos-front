import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {EnderecoService} from "../../service/endereco.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public operacao = true;
  private textoBotao = "Entrar";
  private textoLink = "Criar nova conta.";

  constructor(
    public userService : UserService,
    public utils : UtilsService,
    public auth : AuthService,
    public enderecoService : EnderecoService,
    private route: Router
  ){}

  ngOnInit(): void {
    let tokenCache = sessionStorage.getItem("ust")
    if (tokenCache != null) {
      this.route.navigate(['menu']);
    }
    let camposRegistro = document.querySelectorAll(".campoRegistro");
    for (let i = 0; i < camposRegistro.length; i++) {
      camposRegistro[i].setAttribute("style", "display: none");
    }
  }

  public esqueciSenha(){
    this.route.navigate(['esqueci-senha'])
  }

  public alterarTextoRegistro() : void{
    this.operacao = !this.operacao;
    this.atualizarTextos();
    let labelRegistro = document.querySelector("#labelRegistro");
    if(labelRegistro){
      labelRegistro.textContent = this.textoLink;
    }
    let botaoRegistro = document.querySelector("#botaoLogin span");
    if(botaoRegistro){
      botaoRegistro.textContent = this.textoBotao;
    }
    let msgErro = document.querySelector("#msgErro") as HTMLElement;
    msgErro.innerHTML = "";

  }

  private atualizarTextos(){
    this.textoBotao = this.operacao ? "Entrar" : "Registrar";
    this.textoLink = this.operacao ? "Criar nova conta." : "Fazer Login";
    let camposRegistro = document.querySelectorAll(".campoRegistro");
    for (let i = 0; i < camposRegistro.length; i++) {
      let display = this.operacao ? "display: none" : "display: block";
      camposRegistro[i].setAttribute("style", display);
    }
  }

  public acaoBotao(){
    this.operacao ? this.logarUsuario() : this.registrarUsuario();
  }

  public logarUsuario(){
    let usuarioInput = document.querySelector("#usuario") as HTMLInputElement;
    let senhaInput = document.querySelector("#senha") as HTMLInputElement;

    if(usuarioInput && senhaInput && usuarioInput.value && senhaInput.value){
      let usuario = usuarioInput.value
      let senha = senhaInput.value
      this.userService.logarUsuario(usuario,senha).subscribe(data =>{
        this.route.navigate(["menu"])
      }, error =>{
        let msgErro = this.utils.getErrorMsg(error, "usuário")
        let msgErrorP = document.querySelector("#msgErro") as HTMLElement;
        msgErrorP.innerHTML = msgErro;
      })

    }else{
      alert("Para efetuar o login você deve inserir email e senha válidos.");
      return;
    }
  }

  public registrarUsuario(){
    let usuarioInput = document.querySelector("#usuario") as HTMLInputElement;
    let senhaInput = document.querySelector("#senha") as HTMLInputElement;
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
    let frkUsuario = this.auth.getPrkUsuario();

    if(usuarioInput && senhaInput
      && usuarioInput.value && senhaInput.value
      && nomeInput && nomeInput.value
      && docregistroInput && docregistroInput.value
      && conselhoInput && conselhoInput.value
      && numeroconselhoInput && numeroconselhoInput.value
      && cepInput && cepInput.value
      && logradouroInput && logradouroInput.value
      && numeroInput && numeroInput.value
      && bairroInput && bairroInput.value
      && cidadeInput && cidadeInput.value
      && ufInput && ufInput.value
      && profissaoInput && profissaoInput.value){
      let usuario = usuarioInput.value
      let senha = senhaInput.value
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
      this.userService.cadastrarUsuario(nome,usuario,senha,endereco,docregistro,conselho,numeroconselho,profissao).subscribe(data =>{
        this.alterarTextoRegistro();
        alert("Usuário registrado com sucesso.")
      },error =>{
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "usuário", true)
        msgErro.innerHTML = msg ? msg : "Erro ao registrar usuário.";
      })

    }else{
      alert("Para efetuar um registro de conta você deve inserir email e senha válidos.");
      return;
    }
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






}
