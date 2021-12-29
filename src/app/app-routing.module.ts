import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import {AuthguardService} from "./service/authguard.service";
import {PacientesComponent} from "./views/pacientes/pacientes.component";
import {MenuComponent} from "./views/menu/menu.component";
import {CadastraPacienteComponent} from "./views/cadastra-paciente/cadastra-paciente.component";
import {PacienteDetalhaComponent} from "./views/paciente-detalha/paciente-detalha.component";
import {ServicosComponent} from "./views/servicos/servicos.component";
import {CadastraServicoComponent} from "./views/cadastra-servico/cadastra-servico.component";
import {ServicoDetalhaComponent} from "./views/servico-detalha/servico-detalha.component";
import {CadastraReciboComponent} from "./views/cadastra-recibo/cadastra-recibo.component";
import {RecibosComponent} from "./views/recibos/recibos.component";
import {ImprimeReciboComponent} from "./views/imprime-recibo/imprime-recibo.component";
import {UsuarioDetalhaComponent} from "./views/usuario-detalha/usuario-detalha.component";
import {EsqueciSenhaComponent} from "./views/esqueci-senha/esqueci-senha.component";
import {RecuperarSenhaComponent} from "./views/recuperar-senha/recuperar-senha.component";
import {GestaoFinanceiraComponent} from "./views/gestao-financeira/gestao-financeira.component";
import {FinanceiroPfAnualComponent} from "./views/financeiro-pf-anual/financeiro-pf-anual.component";

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'menu',
    component : MenuComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "esqueci-senha",
    component : EsqueciSenhaComponent,
  },
  {
    path : "recuperar-senha",
    component : RecuperarSenhaComponent,
  },
  {
    path : 'pacientes',
    component : PacientesComponent,
    canActivate : [AuthguardService]
  },
  {
    path : 'pacientes-cadastro',
    component : CadastraPacienteComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "pacientedetalhe",
    component : PacienteDetalhaComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "servicos",
    component : ServicosComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "servicos-cadastro",
    component : CadastraServicoComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "servicodetalhe",
    component : ServicoDetalhaComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "recibos-cadastro",
    component : CadastraReciboComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "recibos",
    component : RecibosComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "imprimir",
    component : ImprimeReciboComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "usuario-detalha",
    component : UsuarioDetalhaComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "gestao-financeira",
    component : GestaoFinanceiraComponent,
    canActivate : [AuthguardService]
  },
  {
    path : "financeiro-pf-anual",
    component : FinanceiroPfAnualComponent,
    canActivate : [AuthguardService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
