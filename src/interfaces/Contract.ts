export interface Contract {
  id?: string;
  contractUrl?: string;
  isSigned?: boolean;
  clientId: string;
  eventId: number;
  package: string;
  value: number;
  status?: string; //default PENDING
  date: string;
  paymentMethod?: string;
  splitPayment?: boolean;
  paymentDueDate: string;
  observations?: string;
}
