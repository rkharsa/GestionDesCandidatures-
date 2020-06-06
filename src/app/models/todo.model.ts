import { Address } from './address.model';

export class Todo {
 constructor(
  public id :number,
  public name:string,
  public  societe :string ,
  public descriptionE:string,
  public  competence :string,
  public tache:string,
  public priority:number,
  public email:string,
  public link:string,
  public tel :number,
  public address:Address,
  public response:string,
  public date_created:string,
  public done:number){ //0 pas de reponse 1 en cours 2 accepter  // 3 refuser

  }

}
