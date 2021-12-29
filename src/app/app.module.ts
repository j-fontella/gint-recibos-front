import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http'
import {OrderListModule} from 'primeng/orderlist';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { MenuComponent } from './views/menu/menu.component';
import { CadastraPacienteComponent } from './views/cadastra-paciente/cadastra-paciente.component';
import { PacienteDetalhaComponent } from './views/paciente-detalha/paciente-detalha.component';
import { ServicosComponent } from './views/servicos/servicos.component';
import { ServicoDetalhaComponent } from './views/servico-detalha/servico-detalha.component';
import { CadastraServicoComponent } from './views/cadastra-servico/cadastra-servico.component';
import { CadastraReciboComponent } from './views/cadastra-recibo/cadastra-recibo.component';
import { RecibosComponent } from './views/recibos/recibos.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ImprimeReciboComponent } from './views/imprime-recibo/imprime-recibo.component';
import { UsuarioDetalhaComponent } from './views/usuario-detalha/usuario-detalha.component';
import { EsqueciSenhaComponent } from './views/esqueci-senha/esqueci-senha.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
import { GestaoFinanceiraComponent } from './views/gestao-financeira/gestao-financeira.component';
import { FinanceiroPjAnualComponent } from './views/financeiro-pj-anual/financeiro-pj-anual.component';
import { FinanceiroPfAnualComponent } from './views/financeiro-pf-anual/financeiro-pf-anual.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PacientesComponent,
    MenuComponent,
    CadastraPacienteComponent,
    PacienteDetalhaComponent,
    ServicosComponent,
    ServicoDetalhaComponent,
    CadastraServicoComponent,
    CadastraReciboComponent,
    RecibosComponent,
    ImprimeReciboComponent,
    UsuarioDetalhaComponent,
    EsqueciSenhaComponent,
    RecuperarSenhaComponent,
    GestaoFinanceiraComponent,
    FinanceiroPjAnualComponent,
    FinanceiroPfAnualComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    OrderListModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
