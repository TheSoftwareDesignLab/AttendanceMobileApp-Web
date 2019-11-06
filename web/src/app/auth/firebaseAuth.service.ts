import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, CanActivate } from '@angular/router';
import { retry, catchError, map, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from '@Attendance-web/loading/loading.service';
import * as firebase from 'firebase'

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService implements CanActivate {
    currentUser;
    provider;
    constructor(
        private firebaseAuth: AngularFireAuth,
        private database: AngularFirestore,
        private loadingSevice: LoadingService,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.provider =  new firebase.auth.OAuthProvider('microsoft.com');

        this.provider.setCustomParameters({
            // Force re-consent.
            prompt: 'consent',
            // Target specific email with login hint.
            login_hint: '',
            tenant: 'uniandes.edu.co'
        });

        // this.loadingSevice.startLoading();
        this.firebaseAuth.auth.onAuthStateChanged( user => {
            if (user) {
                // this.ngZone.run(() => {
                //     this.loadingSevice.stopLoading();
                //     this.currentUser = user;
                //     this.router.navigate(['/gameForm']);
                // });
            } else {
                //  this.signOut();
            }
        });
    }

    signOut() {
        this.firebaseAuth.auth.signOut();
    }

    signIn() {
        this.firebaseAuth.auth.signInWithPopup(this.provider)
        .then(function(result) {
          // User is signed in.
          // IdP data available in result.additionalUserInfo.profile.
          // OAuth access token can also be retrieved:
          // result.credential.accessToken
          // OAuth ID token can also be retrieved:
          // result.credential.idToken
          console.log(result.user.displayName, result.user.email)
        })
        .catch(function(error) {
          // Handle error.
          console.log(error)
        });
    }

    canActivate(): Observable<boolean> {
        return this.firebaseAuth.authState.pipe(
            map( user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/sign-in']);
                    return false;
                }
            }),
            retry(1),
            catchError( err => {
                this.router.navigate(['/sign-in']);
                return Observable.throw(err);
            })
        );
    }
}