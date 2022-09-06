import { bank } from "./bank";
export interface cheque{
  ChequeNo:Number,
Amount: Number,
drawer: String,
bankId: bank,
status:String,
receivedDate: Date,
DueDate:Date,
chequeImageUri: String
}
