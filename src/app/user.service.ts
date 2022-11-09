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

  getUsers(): Observable<UserInterface[]> {
    return of(Users).pipe(delay(DELAY));
  }

  getEmpty(): Observable<UserInterface[]> {
    return of([]).pipe(delay(DELAY));
  }
}
