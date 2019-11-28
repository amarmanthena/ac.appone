import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements InMemoryDbService {

  createDb() {
    const users: UserDto[] = [
      { id: 1, firstName: 'Abraham', surname: 'Higgins', usersdatumId: 'api' },
      { id: 2, firstName: 'Michelle', surname: 'Taylor', usersdatumId: 'api' },
      { id: 3, firstName: 'Arnold', surname: 'Smith', usersdatumId: 'api' },
      { id: 4, firstName: 'Luke', surname: 'Cunningham', usersdatumId: 'api' },
      { id: 5, firstName: 'Harold', surname: 'Anderson', usersdatumId: 'api' },
      { id: 6, firstName: 'Elian', surname: 'Tucker', usersdatumId: 'api' },
      { id: 7, firstName: 'Annabella', surname: 'Mason', usersdatumId: 'api' },
      { id: 8, firstName: 'Dale', surname: 'Foster', usersdatumId: 'api' },
      { id: 9, firstName: 'Kellan', surname: 'Payne', usersdatumId: 'api' }
    ];

    return {users};
  }
}
