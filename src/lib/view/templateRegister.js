export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `
  <fieldset>
  
      <form action="" id='form_register'>
      <label for="">Nombre</label>
      <input type="text" id='name_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Apellido</label>
      <input type="text" id='ape_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Correo</label>
      <input type="mail" id='mail_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Contraseña</label>
      <input type="password" id='pass_register' alt="" value="" name="">
      <br>
      <br>
      </form>
      <button id="registrar">Registrar</button>
      </fieldset> 
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#registrar');
  enviar.addEventListener('click', () => {
    const mail = document.getElementById('mail_register').value;
    const pass = document.getElementById('pass_register').value;
    const unaNombre = document.getElementById('name_register');
    const unaApellido = document.getElementById('ape_register');
    firebase.auth().createUserWithEmailAndPassword(mail, pass)
      .then(() => {
        const user2 = firebase.auth().currentUser;
        user2.sendEmailVerification().then(() => {
          const firestore = firebase.firestore();
          const docRef = firestore.doc('samples/registro');
          const textoSave = unaNombre.value;
          const textoApe = unaApellido.value;
          docRef.collection('user').add({
            nombre: textoSave,
            apellido: textoApe,
            correo: mail,
            contraseña: pass,
          }).then(() => {
            window.location = ('#/');
            // console.log('muy bien');
          });
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMensagge = error.message;
      });
    firebase.auth().signOut().then(() => {
      // eslint-disable-next-line no-alert
      alert('verifica tu correo');
    });
  });
  return divRegister;
};
