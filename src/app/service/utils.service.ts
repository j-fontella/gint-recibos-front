import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public isObject(obj : any) : boolean{
    return typeof obj === 'object' && obj !== null
  }

  public converteTipoProcedimentoSingular(procedimento:string){
    let ret = "";
    switch (procedimento){
      case "sessões":
        ret = "sessão";
        break;
      default:
        ret = procedimento.substr(0,procedimento.length-1);
        break;
    }
    return ret;
  }

  public formataNumeroDuasCasasComMoeda(numero:any){
      if(isNaN(numero) || !numero){
        return "R$0,00"
      }
      numero = parseFloat(numero);
      return "R$"+(numero.toFixed(2)).replace(".", ",")
  }

  public formataNumeroDuasCasasSemMoeda(numero:any){
    return (numero.toFixed(2)).replace(".", ",")
  }

  public getErrorMsg(json:any, label : String, reverse = false) : string {
    console.log(json)
    if(!this.isObject(json.error)){
      return json.error ? json.error : `Erro ao registrar ${label}`;
    }
    let errors = json.error.errors;
    let error_msgs : any = [];
    let msg : string = "Contate o suporte";

    if(Array.isArray(errors)){
      msg = "";
      errors.forEach((error : any) => {
        error_msgs.push(error.defaultMessage);
      })

      error_msgs.sort();
      if(reverse){
        error_msgs.reverse()
      }

      error_msgs.forEach((error : string) => {
        msg += error + "<BR>";
      })
    }


    return msg;
  }
}
