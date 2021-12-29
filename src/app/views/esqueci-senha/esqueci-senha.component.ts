import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {EnderecoService} from "../../service/endereco.service";
import {Router} from "@angular/router";
import {RecuperarService} from "../../service/recuperar.service";

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {

  constructor(
    public userService : UserService,
    public utils : UtilsService,
    public auth : AuthService,
    public recuperarService : RecuperarService,
    private route: Router
  ){}

  ngOnInit(): void {
  }

  public esqueciSenha(){
    let emailInput = document.querySelector("#email") as HTMLInputElement;
    if(emailInput && emailInput.value){
      this.recuperarService.gerarToken(emailInput.value).subscribe(data => {
        this.route.navigate(['recuperar-senha'], {state : {"email" : emailInput.value}})
      }, error => {
        let msg = this.utils.getErrorMsg(error, "solicitação de recuperação de senha");
        alert(msg)
      })
    }else{
      alert("Preencha o email")
    }

  }

  public retornarMenu(){
    this.route.navigate([''])
  }
}


