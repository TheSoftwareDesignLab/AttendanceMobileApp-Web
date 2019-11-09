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
        private ngZone: NgZone,
        private firestore: AngularFirestore 
    ) {
        this.provider =  new firebase.auth.OAuthProvider('microsoft.com');

        this.provider.setCustomParameters({
            // Force re-consent.
            prompt: 'consent',
            // Target specific email with login hint.
            login_hint: '',
            tenant: 'uniandes.edu.co'
        });

        this.loadingSevice.startLoading();
        this.firebaseAuth.auth.onAuthStateChanged( user => {
            if (user) {
                this.ngZone.run(() => {
                    this.currentUser = user;
                });
            } else {
                this.signOut();
            }
        });
    }

    signOut() {
        this.loadingSevice.stopLoading();
        this.firebaseAuth.auth.signOut();
        this.router.navigate(['/']);
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
                    this.firestore.collection('admins').doc(this.currentUser.email).get().subscribe( res => {
                        this.loadingSevice.stopLoading();
                        if (res.exists) {
                            this.router.navigate(['/admin']);
                        } else {
                            if (res.exists) {
                                this.firestore.collection('professors').doc(this.currentUser.email).get().subscribe( res => {
                                    this.router.navigate(['/']);
                                } );
                            } else {
                                this.firestore.collection('studentList').doc(this.currentUser.email).get().subscribe( res => {
                                    this.router.navigate(['/']);
                                });
                            }
                        }
                    });
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            }),
            retry(1),
            catchError( err => {
                this.router.navigate(['/']);
                return Observable.throw(err);
            })
        );
    }
}