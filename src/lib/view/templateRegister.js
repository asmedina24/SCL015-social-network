export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `<div class= "caja_register">
  <fieldset class="contenedor_register">
  
      <form action="" id='form_register'>
      <h2 class="title_register">Register</h2>
      <br>
      <input type="text" id='name_register' placeholder="Nombre" alt="" value="" name="">
      <br>
      <br>
      <input type="text" id='ape_register' placeholder="Apellido"alt="" value="" name="">
      <br>
      <br>
      <input type="mail" id='mail_register' placeholder="E-mail" alt="" value="" name="">
      <br>
      <br>
      <input type="password" id='pass_register' placeholder="Password" alt="" value="" name="">
      <br>
      <br>
      <button id="registrar">Registrar</button>
      </form>
      </fieldset> 
      <img class="circulo_registro" src="./img/Ellipse_2.png">
      <img src="./img/image_7.png" class="perritos_registro" alt="">
      </div>
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#registrar');
  enviar.addEventListener('click', () => {
    const mail = document.getElementById('mail_register').value;
    const pass = document.getElementById('pass_register').value;
    const name = document.getElementById('name_register').value;
    const lastName = document.getElementById('ape_register').value;
    firebase.auth().createUserWithEmailAndPassword(mail, pass)
      .then(() => {
        const user2 = firebase.auth().currentUser;
        user2.sendEmailVerification().then(() => {
          const firestore = firebase.firestore();
          const docRef = firestore.doc('samples/registro');
          docRef.collection('user').add({
            nombre: name,
            apellido: lastName,
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
