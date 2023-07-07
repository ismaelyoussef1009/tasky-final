import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged,signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendSignInLinkToEmail } from 'firebase/auth';
import { Router } from '@angular/router';
import { StorageService } from './local-store.service';
import { Iuser } from '../interfaces/user.interface';
import { UserService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  googeProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  constructor(private auth: Auth, private route: Router, private localStore: StorageService) { }
  actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://tabaski.web.app/",
    // This must be true.
    handleCodeInApp: true,
  };
  signIn(user: Iuser) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result: any) => {
        sendSignInLinkToEmail(this.auth, user.email, this.actionCodeSettings)
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        .then(()=>{
          this.localStore.set('emailForSignIn', user.email);
          console.log(user.email, "verified" );
            this.localStore.set('User', {
              Name: user.username,
              email: user?.email,
              // PhotoURL: user?.photoURL,
              loginStatus:true,
            })
            
          
        }).catch((error)=>{
          console.log(error.code, error.message);
          alert(error)
          
        })
        
        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
          // alert(UserService)
        })
        this.route.navigate(['main']);
      }).catch((err: any) => {
        console.log(err.code);
        console.log(err.message);
        alert(err.code)
        // alert(err.message)
      });
  }

 
  signOut(){
    signOut(this.auth).then(()=>{
      onAuthStateChanged(this.auth, (user) => {
        this.localStore.set('User', {
          Name: user?.displayName,
          email: user?.email,
          PhotoURL: user?.photoURL,
          loginStatus:false
        })

      })
      window.location.reload();
      alert(`Signed out successfully`);
    }).catch((error)=>{
      alert(error.code);
    })
  }
  signUp(user: Iuser) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((result) => {
        console.log('Registration successfull');
        alert("Registration successfull")
        this.route.navigate(['/main']);
      }).catch((err) => {
        console.log(err.code);
        alert(err)
      });

  }
  googleSignIn() {
    signInWithPopup(this.auth, this.googeProvider)
      .then((result) => {
        console.log(result.user);

        this.route.navigate(['main']);
        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
        })
      }).catch((err) => {
        console.log(err.code);

      });
  }
  facebookSignIn() {
    signInWithPopup(this.auth, this.facebookProvider)
      .then((result) => {
        console.log(result.user);
        this.route.navigate(['']);
        onAuthStateChanged(this.auth, (user) => {
          this.localStore.set('User', {
            Name: user?.displayName,
            email: user?.email,
            PhotoURL: user?.photoURL,
            loginStatus: user?.emailVerified
          })
        })
      }).catch((err) => {
        console.log(err.code);
      });
  }
}