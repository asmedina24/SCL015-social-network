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
      <button id="registrar2">prueba</button>
      </fieldset> 
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#registrar');
  enviar.addEventListener('click', () => {
    const mail = document.getElementById('mail_register').value;
    const pass = document.getElementById('pass_register').value;
    // console.log(mail);
    // console.log(pass);
    firebase.auth().createUserWithEmailAndPassword(mail, pass)
      // .then((user) => {
      //   console.log(user);
      //   const form = divRegister.querySelector('#form_register');
      //   form.reset();
      // })
      .then(() => {
        const user2 = firebase.auth().currentUser;

        user2.sendEmailVerification().then(() => {
          window.location = ('#/');
          // Email sent.
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMensagge = error.message;
      });
    firebase.auth().signOut().then(() => {
      alert('verifica tu correo');
    });
  });
  const botonRegister = divRegister.querySelector('#registrar2');
  botonRegister.addEventListener('click', () => {
    const unaNombre = document.getElementById('name_register');
    const firestore = firebase.firestore();
    const docRef = firestore.doc('samples/registro');
    const textoSave = unaNombre.value;
    docRef.set({
      nombre: textoSave,
    })
      .then(() => {
        console.log('muy bien');
      }).catch((error) => {
        console.log('hay un error', error);
      });
  });
  return divRegister;
};
