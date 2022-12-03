import cloneDeep from 'lodash-es/cloneDeep';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Users } from './mock.data';

const DELAY = 500;
export interface UserInterface {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getData(): UserInterface[] {
    return Users;
  }

  getUsers(filter: {
    page: number;
    limit?: number;
  }): Observable<UserInterface[]> {
    const { page = 1, limit = 4 } = filter;

    return of(cloneDeep(Users.slice((page - 1) * limit, page * limit))).pipe(
      delay(DELAY)
    );
  }

  getEmpty(): Observable<UserInterface[]> {
    return of([]).pipe(delay(DELAY));
  }
}
