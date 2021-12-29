import {Component, OnInit} from '@angular/core';
import {ServicoService} from "../../service/servico.service";
import {UtilsService} from "../../service/utils.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {PacienteService} from "../../service/paciente.service";
import {ReciboService} from "../../service/recibo.service";

@Component({
  selector: 'app-cadastra-recibo',
  templateUrl: './cadastra-recibo.component.html',
  styleUrls: ['./cadastra-recibo.component.scss']
})
export class CadastraReciboComponent implements OnInit {
  private dataProcedimentoCadastrado = 0;
  constructor(
    private reciboService : ReciboService,
    public servicoService : ServicoService,
    public pacienteService : PacienteService,
    public utils : UtilsService,
    private authService: AuthService,
    private route : Router
  ){}

  ngOnInit(): void {
    let prkUsuario = this.authService.getPrkUsuario();
    let servicoSelect = document.querySelector("#servico");
    let pacienteSelect = document.querySelector("#paciente");
    this.servicoService.getServicosPorUsuario(prkUsuario).subscribe(data => {
      console.log(data)
      for (let dataKey in data) {
        // @ts-ignore
        let servico = data[dataKey];
        let option = document.createElement("option");
        option.value = servico.prk;
        option.innerHTML = servico.nome;
        // @ts-ignore
        servicoSelect.appendChild(option)
      }
    },error => {
      this.authService.validateLoginError(error);
    })
    this.pacienteService.getPacientesPorUsuario(prkUsuario).subscribe(data => {
      console.log(data)
      for (let dataKey in data) {
        // @ts-ignore
        let paciente = data[dataKey];
        let option = document.createElement("option");
        option.value = paciente.prk;
        option.innerHTML = paciente.nome;
        // @ts-ignore
        pacienteSelect.appendChild(option)
      }
    },error => {
      this.authService.validateLoginError(error);
    })
  }

  public alterarVisualizacaoInputQtd(){
      let tipoProcedimento = document.querySelector('#tipoProcedimento') as HTMLSelectElement
      let valTipoProcedimento : any = tipoProcedimento.value;
      let divQtd = document.querySelector("#divQtdTipoProcedimento") as HTMLElement
      let inputQtdProcedimento = document.querySelector("#qtdTipoProcedimento") as HTMLInputElement
      if(valTipoProcedimento == "" ){
        divQtd.style.display = "none"
        inputQtdProcedimento.value = ""
      }else{
        divQtd.style.display = "block"
      }


  }

  public registrarRecibo(){
    this.authService.isAutenticado();
    let valorInput = document.querySelector("#valor") as HTMLInputElement;
    let dataInput = document.querySelector("#data") as HTMLInputElement;
    let selectPaciente = document.querySelector("#paciente") as HTMLSelectElement;
    let selectServico = document.querySelector("#servico") as HTMLSelectElement;
    let cidadeInput = document.querySelector("#cidade") as HTMLInputElement;
    let tipoProcedimentoInput = document.querySelector("#tipoProcedimento") as HTMLInputElement;
    let qtdTipoProcedimentoInput = document.querySelector("#qtdTipoProcedimento") as HTMLInputElement;
    if(tipoProcedimentoInput && tipoProcedimentoInput.value && (!qtdTipoProcedimentoInput ||!qtdTipoProcedimentoInput.value)){
      alert("Insira a quantidade ou remova o tipo de procedimento.");
      return;
    }
    if(qtdTipoProcedimentoInput && qtdTipoProcedimentoInput.value && (!tipoProcedimentoInput ||!tipoProcedimentoInput.value)){
      alert("Insira a quantidade ou remova o tipo de procedimento.");
      return;
    }
    let observacaoInput = document.querySelector("#observacao") as HTMLSelectElement;
    let observacao = null
    if(observacaoInput && observacaoInput.value){
      observacao = observacaoInput.value;
    }
    if(valorInput && valorInput.value
      && selectPaciente && selectPaciente.value
      && selectServico && selectServico.value
      && dataInput && dataInput.value
      && cidadeInput && cidadeInput.value
      ){
      let valor = valorInput.value
      let paciente = selectPaciente.value
      let servico = selectServico.value
      let data = dataInput.value
      let cidade = cidadeInput.value
      let tipoProcedimento = tipoProcedimentoInput.value
      let qtdTipoProcedimento = qtdTipoProcedimentoInput.value
      let listaDatasProcedimentos = [];
      for (let i = 0; i < this.dataProcedimentoCadastrado ; i++) {
        let input = document.querySelector(`#dataProcedimento${i}`) as HTMLInputElement
        listaDatasProcedimentos.push(input.value)
      }
      let datasProcedimento = listaDatasProcedimentos.length > 0 ? listaDatasProcedimentos : null;

      this.reciboService.cadastrarRecibo(valor, paciente, servico, data, cidade, tipoProcedimento, qtdTipoProcedimento, datasProcedimento, observacao).subscribe(data =>{
        alert("Recibo registrado com sucesso!")
        this.route.navigate(["menu"])
      },error =>{
        this.authService.validateLoginError(error);
        let msgErro = document.querySelector("#msgErro") as HTMLElement;
        let msg : string = this.utils.getErrorMsg(error, "serviço")
        msgErro.innerHTML = msg ? msg : "Erro ao registrar serviço.";
      })

    }else{
      alert("Para efetuar um registro de serviço você deve inserir nome válido");
      return;
    }
  }

  public redirecionarMenu(){
    this.route.navigate(["recibos"])
  }

  public removerDataProcedimento(){
    let div = document.querySelector(`#divDataProc${this.dataProcedimentoCadastrado-1}`)
    if(div){
      div.remove();
      this.dataProcedimentoCadastrado--;
    }
  }

  public addDataProcedimento(){
    let divDataProcedimentos = document.querySelector('#dataProcedimentos');
    let div = document.createElement("div");
    div.classList.add("col-12");
    div.id = `divDataProc${this.dataProcedimentoCadastrado}`
    let label = document.createElement("label");
    label.htmlFor = `dataProcedimento${this.dataProcedimentoCadastrado}`;
    label.textContent = `Data ${this.dataProcedimentoCadastrado+1}:`;
    let input = document.createElement("input");
    input.id = `dataProcedimento${this.dataProcedimentoCadastrado}`;
    input.classList.add("col-12");
    input.type = "date";
    // @ts-ignore
    divDataProcedimentos.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
    this.dataProcedimentoCadastrado++;
  }

}
