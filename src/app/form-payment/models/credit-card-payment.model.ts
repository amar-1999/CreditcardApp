export interface CreditCardPayment {
  creditCardNumber: string;
  cardHolder: string;
  expirationDate: Date;
  securityCode?: string;
  amount: number;
}
