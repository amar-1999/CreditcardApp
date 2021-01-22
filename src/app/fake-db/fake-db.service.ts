import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CreditCardDetailsFakeDb } from 'src/app/fake-db/creditCardDetails.data';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // Credit Card Details API
      'credit-card-details': CreditCardDetailsFakeDb.creditCardData,
    };
  }
}
