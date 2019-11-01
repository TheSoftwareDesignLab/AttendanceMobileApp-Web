import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingService } from '@Attendance-web/loading/loading.service';
import { Router, CanActivate } from '@angular/router';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Credentials, User } from './auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService implements CanActivate {
    private readonly USER_INFO = 'userInfo';
    currentUser;

    constructor(
        private firebaseAuth: AngularFireAuth,
        private database: AngularFirestore,
        private loadingSevice: LoadingService,
        private router: Router,
        private ngZone: NgZone
    ) {
        this.loadingSevice.startLoading();
        this.firebaseAuth.auth.onAuthStateChanged( user => {
            if (!user) {
                 this.signOut();
            }
        });
    }

    signIn(credentials: Credentials){
        this.firebaseAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then( response => {
            this.database.collection('users').doc(response.user.uid).get().subscribe(user => {
                this.loadingSevice.stopLoading();
                if (user.exists) {
                    this.router.navigate(['/']);
                } else {
                }
            });
        });
    }

    signOut() {
        this.firebaseAuth.auth.signOut();
        this.loadingSevice.stopLoading();
        this.router.navigateByUrl('/sign-in');
    }

    register(user: User) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then( response => {
            this.database.collection('users').doc(response.user.uid).set(user, {merge: true}).then( userResponse => {
                this.loadingSevice.stopLoading();
                this.router.navigate(['/']);
            }).catch( error => {
            });
        }).catch( error => {
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