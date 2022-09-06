import { Invoice } from './invoice';
import { cheque } from './cheque';
import { modes } from './mode';



export interface payment{

  paymentId:  Number,

InvoiceID: Invoice ,
Amount: Number,
PaymentDate: Date,
PaymentMode: String,
PaymentModeId:modes,
ChequeId: cheque,

}
