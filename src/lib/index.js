/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
// aqui exportaras las funciones que necesites
export const myFunction = () => {
  // aqui tu codigo
};
export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // eslint-disable-next-line no-unused-vars
    const token = result.credential.accessToken;
    // The signed-in user info.
    // eslint-disable-next-line no-unused-vars
    const user = result.user;
    const uid = user.uid;
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
    const credential = error.credential;
    // ...
  });
};
