export interface FinancialRecord {
  id?: string;
  type: string;
  contractId?: string;
  expenseCategoryId?: number;
  revenueCategoryId?: number;
  amount: number;
  month: number;
  year: number;
  status: string;
  paymentMethod?: string;
}
