import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/core/util/interfaces';
import { ApiService } from '../infrastructure/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver {
  constructor(private readonly api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    const id = route.paramMap.get('id');

    return !id ? of(null) : this.api
      .getUserDetails(+id)
      .pipe(catchError(() => throwError(() => new Error('User not Found!'))));
      }
}
