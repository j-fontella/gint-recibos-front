import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {EnderecoService} from "../../service/endereco.service";
import {Router} from "@angular/router";
import {RecuperarService} from "../../service/recuperar.service";

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  private operacao = false;
  public email = "";
  constructor(
    public userService : UserService,
    public utils : UtilsService,
    public auth : AuthService,
    public recuperarService : RecuperarService,
    private route: Router
  ){}

  ngOnInit(): void {
    let rota : any = this.route
    this.email = rota.lastSuccessfulNavigation.extras.state?.email
    this.validarEmail();
  }

  public retornar(){
      this.route.navigate(['esqueci-senha'])
  }

  private validarEmail(){
    if(!this.email){
      alert("Insira um email")
      this.retornar();
      return;
    }
  }

  public recuperar(){
    this.validarEmail()
    let senhaInput = document.querySelector("#senha") as HTMLInputElement;
    let tokenInput = document.querySelector("#token") as HTMLInputElement;
    if(senhaInput && senhaInput.value && tokenInput && tokenInput.value){
      let senha = senhaInput.value
      let token = tokenInput.value
      this.recuperarService.recuperar(this.email,token,senha).subscribe(data => {
        alert("Senha alterada com sucesso!")
        this.route.navigate([''])
      }, error => {
        let msg = this.utils.getErrorMsg(error, "solicitação de recuperação de senha");
        alert(msg)
      })
    }else{
      alert("Preencha o token e a nova senha.")
    }

  }

}
