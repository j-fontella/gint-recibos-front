import { Component, OnInit } from '@angular/core';
import {PacienteService} from "../../service/paciente.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Paciente} from "../../models/paciente";
import {Recibo} from "../../models/recibo";
import {ReciboService} from "../../service/recibo.service";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "../../service/utils.service";

@Component({
  selector: 'app-imprime-recibo',
  templateUrl: './imprime-recibo.component.html',
  styleUrls: ['./imprime-recibo.component.scss']
})
export class ImprimeReciboComponent implements OnInit {

  public usuarioLogado = "";
  private prk = -1;
  private operacao = false;
  public recSelecionados : FormGroup

  constructor(
    public pacienteService : PacienteService,
    private route: Router,
    private authService : AuthService,
    private reciboervice : ReciboService,
    private utils : UtilsService
  ){
    this.recSelecionados = new FormGroup({
      recsel: new FormControl()
    });
  }

  public listaPacientes: Paciente[] = [];
  public listaRecibos: Recibo[] = [];
  public nomePaciente : String = "";


  ngOnInit(): void {
    let rota : any = this.route
    let texto = rota.lastSuccessfulNavigation.extras.state?.nome
    this.usuarioLogado = texto
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

  public imprimir(){
    if(this.prk == -1){
      alert("Selecione o paciente.")
      return;
    }
    this.gerarImpressao()
  }
  public redirecionarGeral(){
    this.route.navigate(["recibos"])
  }
  public setPaciente(prk:number, nome:string){
    this.prk = prk;
    this.nomePaciente = nome;
    let recibos = document.querySelector("#recibos");
    let pacientes = document.querySelector("#pacientes");
    // @ts-ignore
    recibos.setAttribute("style", "display: block");
    // @ts-ignore
    pacientes.setAttribute("style", "display: none");
    this.setRecibo();

  }

  public gerarImpressao(){
    let recibosSelecionados :any = this.recSelecionados.controls['recsel'].value
    if(!recibosSelecionados){
      alert("Selecione pelo menos um recibo");
      return;
    }
    let prk = this.authService.getPrkUsuario();


    this.reciboervice.imprimirRecibo(recibosSelecionados, prk).subscribe(data => {

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${this.nomePaciente}.pdf`;
      link.click();
    },error =>{
      this.authService.validateLoginError(error);
      alert(this.utils.getErrorMsg(error, "impressão de recibo"))
    })
  }

  public setRecibo(){
    this.reciboervice.getRecibosPorPaciente(this.prk).subscribe(data =>{
      this.listaRecibos = data as unknown as Recibo[];
      this.listaRecibos.forEach((recibo) =>{
        console.log(recibo)
        let procedimentoTexto = recibo.servico;
        if(recibo.tipoProcedimento && recibo.qtdTipoProcedimento){
          // @ts-ignore
          let textoTipoProcedimento = parseInt(recibo.qtdTipoProcedimento) == 1 ? this.utils.converteTipoProcedimentoSingular(recibo.tipoProcedimento) : recibo.tipoProcedimento;
          procedimentoTexto = `${recibo.qtdTipoProcedimento} ${textoTipoProcedimento} de ${recibo.servico}`
        }
        recibo.label = `${procedimentoTexto} - R$${recibo.valor} - ${recibo.data}`
      })
    })

  }

}
