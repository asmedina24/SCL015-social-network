/* eslint-disable no-unused-vars */
const contentLogin = {
  login: (mail, pass) => {
    firebase.auth().signInWithEmailAndPassword(mail, pass)
      .then(() => {
        contentLogin.emailOk();
      });
  },
  // Observador de verificacion si esta logeado o no
  emailOk: () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      const emailVerified = user.emailVerified;
      if (emailVerified === true) {
        window.location = ('#/muro');
      } else {
        alert('verifica tu correo');
        firebase.auth().signOut() // le cierre sesion hasta q verifique email
          .then(() => {
            window.location = ('#/home');
          }).catch((error) => {
            alert('no puede cerrar sesion', error);
          });
      }
    });
  },
  loginGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then((result) => {
      // eslint-disable-next-line no-unused-vars
      const token = result.credential.accessToken;
      // eslint-disable-next-line no-unused-vars
      const user = result.user;
      window.location = ('#/muro');
      // ...
    }).catch((error) => {
      // eslint-disable-next-line no-unused-vars
      const errorCode = error.code;
      // eslint-disable-next-line no-unused-vars
      const errorMessage = error.message;
      const email = error.email;
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
        window.location = ('#/home');
      }).catch((error) => {
        alert('no puede cerrar sesion', error);
      });
  },
};
export default contentLogin;
