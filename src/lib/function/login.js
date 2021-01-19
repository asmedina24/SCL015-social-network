const contentLogin = {
  login: (mail, pass) => {
    firebase.auth().signInWithEmailAndPassword(mail, pass)
      .then((user) => {
        contentLogin.emailOk(mail, pass);
        // contentLogin.estadoLogin();
        const usuario = firebase.auth().currentUser.uid;
        const nombre = firebase.auth().currentUser.displayName;
        const correo = firebase.auth().currentUser.email;
        window.cookie = `usuario=${usuario};nombre=${nombre};correo=${correo}`;
      });
    return window.cookie;
  },
  emailOk: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailVerified = user.emailVerified;
        if (emailVerified === true) {
          window.location = ('#/muro');
        } else {
          // eslint-disable-next-line no-alert
          alert('verifica tu correo');
        }
      }
    });
  },
  estadoLogin: () => {
    
    // firebase.auth().onAuthStateChanged(() => {
    //   const user = firebase.auth().currentUser;
    //   if (user) {
    //     // el usuario ha iniciado sesión , muestra los datos del usuario
    //   } else {
    //     // el usuario ha cerrado sesión, muestra el formulario de inicio de sesión
    //   }
    // });
  },
  // persisteLogin: (email, password) => {
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(() => {
  //     // Existing and future Auth states are now persisted in the current
  //     // session only. Closing the window would clear any existing state even
  //     // if a user forgets to sign out.
  //     // ...
  //     // New sign-in will be persisted with session persistence.
  //       return firebase.auth().signInWithEmailAndPassword(email, password);
  //     })
  //     .catch((error) => {
  //     // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // },
  loginGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location = ('#/muro');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  },
  loginFace: () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location = ('#/muro');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  },
  cerrarsesion: () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('Sesion cerrada correctamente');
        window.location = ('#/home');
      }).catch((error) => {
        console.log('no puede cerrar sesion', error);
      });
  },
};
export default contentLogin;
