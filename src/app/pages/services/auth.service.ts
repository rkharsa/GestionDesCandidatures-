import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, rejected) => {
      firebase.auth().signInWithPopup(provider).then(
        () => {
          resolve();
        }, (error) => {
          rejected(error);
        }
      );
    });
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
