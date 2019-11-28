import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements InMemoryDbService {

  createDb() {
    const users: UserDto[] = [
      { id: 1, firstName: 'Abraham', surname: 'Higgins' },
      { id: 2, firstName: 'Michelle', surname: 'Taylor' },
      { id: 3, firstName: 'Arnold', surname: 'Smith' },
      { id: 4, firstName: 'Luke', surname: 'Cunningham' },
      { id: 5, firstName: 'Harold', surname: 'Anderson' },
      { id: 6, firstName: 'Elian', surname: 'Tucker' },
      { id: 7, firstName: 'Annabella', surname: 'Mason' },
      { id: 8, firstName: 'Dale', surname: 'Foster' },
      { id: 9, firstName: 'Kellan', surname: 'Payne' }
    ];

    return {users};
  }
}
