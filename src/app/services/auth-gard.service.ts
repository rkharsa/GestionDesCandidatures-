import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signIn']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
