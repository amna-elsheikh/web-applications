import { Customer } from './customers';
export interface Invoice {
  InvoiceNo: Number;
  CustomerID: Customer;
  Amount: Number;
  InvoiceDate: Date;
  DueDate: Date;
}
