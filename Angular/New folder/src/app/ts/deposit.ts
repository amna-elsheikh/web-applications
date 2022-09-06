import { bankAcoount } from './bankAccount';
import { reasons } from "./returnReasons";

export interface deposit {
  depositId: Number;
  depositDate: Date;

  bankAccountNo: bankAcoount;
  depositStatus: String;

  chequeNos: [Number];
  returnedReasons: reasons ;
}
