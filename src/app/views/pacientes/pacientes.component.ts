import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Paciente} from "../../models/paciente";
import {PacienteService} from "../../service/paciente.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  public usuarioLogado = "";

  constructor(
    public pacienteService : PacienteService,
    private route: Router,
    private authService : AuthService
  ){}

  public listaPacientes: Paciente[] = [];


  ngOnInit(): void {
    let rota : any = this.route
    this.usuarioLogado = rota.lastSuccessfulNavigation.extras.state?.nome
    this.getPacientes();
  }

  public getPacientes(){
    let prkUsuario = this.authService.getPrkUsuario();
    this.pacienteService.getPacientesPorUsuario(prkUsuario).subscribe(data => {
      console.log(data)
      this.listaPacientes = data as unknown as Paciente[];
    },error => {
      this.authService.validateLoginError(error);
    })
  }

  public redirecionarCadastroPacientes(){
    this.route.navigate(["pacientes-cadastro"])
  }
  public redirecionarGeral(){
    this.route.navigate(["menu"])
  }
  public redirecionarPaciente(nome:String, cpf:String, endereco:String, prk:String){
    this.route.navigate(["pacientedetalhe"], { state: { "nome" : nome, "cpf" : cpf, "endereco" : endereco, "prk" : prk } })
  }
}
