const contentLogin = {
  login: (mail, pass) => {
    firebase.auth().signInWithEmailAndPassword(mail, pass)
      // eslint-disable-next-line no-unused-vars
      .then((user) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            contentLogin.emailOk();
          });
      })
      .catch(() => {
        alert('correo o contraseña invalidos');
      });
  },
  emailOk: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailVerified = user.emailVerified;
        if (emailVerified === true) {
          window.location = ('#/muro');
          console.log('mantener sesion activa');
        } alert('verifica tu correo');
      }
    });
  },
  estadoLogin: () => {
    firebase.auth().onAuthStateChanged((user) => {
      const emailVerified = user.emailVerified;
      if (emailVerified === true) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      } console.log('njda');

      // .then(() => {
      // // window.location = ('#/muro');
      //   console.log('mantener sesion activa');
      // }).catch((error) => {
      //   console.log('no puede cerrar sesion', error);
      // });
    });
  },

  //   firebase.auth().setPersistence()
  //     .then(() => {
  //       console.log('sesion mantenida');
  //       // Existing and future Auth states are now persisted in the current
  //       // session only. Closing the window would clear any existing state even
  //       // if a user forgets to sign out.
  //       // ...
  //       // New sign-in will be persisted with session persistence.
  //       return firebase.auth().onAuthStateChanged(user);
  //     })
  //     .catch((error) => {
  //       window.location = ('#/muro');
  //       // Handle Errors here.
  //       // eslint-disable-next-line no-unused-vars
  //       const errorCode = error.code;
  //       // eslint-disable-next-line no-unused-vars
  //       const errorMessage = error.message;
  //     });

  loginGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // eslint-disable-next-line no-unused-vars
      const token = result.credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line no-unused-vars
      const user = result.user;
      window.location = ('#/muro');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line no-unused-vars
      const errorCode = error.code;
      // eslint-disable-next-line no-unused-vars
      const errorMessage = error.message;
      // The email of the user's account used.
      // eslint-disable-next-line no-unused-vars
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // eslint-disable-next-line no-unused-vars
      const credential = error.credential;
      // ...
    });
  },
  loginFace: () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // eslint-disable-next-line no-unused-vars
      const token = result.credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line no-unused-vars
      const user = result.user;
      window.location = ('#/muro');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line no-unused-vars
      const errorCode = error.code;
      // eslint-disable-next-line no-unused-vars
      const errorMessage = error.message;
      // The email of the user's account used.
      // eslint-disable-next-line no-unused-vars
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // eslint-disable-next-line no-unused-vars
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
