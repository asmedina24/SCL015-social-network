import contentLogin from '../function/login.js';

export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `<div class= "caja_register">
  <fieldset class="contenedor_register">
  
      <form action="" id='form_register'>
      <h2 class="title_register">Register</h2>
      <br>
      <input type="text" id='name_register' placeholder="Nombre" pattern="[a-zA-Z ]{3,30}" title= "Debe contener minimo 3 letras" required >
      <br>
      <br>
      <input type="text" id='ape_register' placeholder="Apellido"  pattern="[a-zA-Z ]{3,30}" title= "Debe contener minimo 3 letras" required>
      <br>
      <br>
      <input type="email" id='mail_register' placeholder="E-mail" required  title="correo invalido, ingrese @">
      <br>
      <br>
      <input type="password" id='pass_register' placeholder="Password" minlength="6" maxlength="8"
      title="Debe contener mas de 6 caracteres" required>
      <br>
      <br>
      </form>
      <button type="button" id="registrar">Registrar</button>
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
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
          .then(() => {
            const firestore = firebase.firestore();
            const currentUserData = firebase.auth().currentUser;
            const uid = currentUserData.uid;
            firestore.collection('user').add({
              nombre: `${name}   ${lastName}`,
              correo: mail,
              contraseña: pass,
              userid: uid,
            })
              .then(() => {
                contentLogin.cerrarsesion();
              });
          });
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        alert('verifica tu correo');
        console.log(user);
        const uid = user.uid;
        return user.updateProfile({
          displayName: `${name}   ${lastName}`,
          userid: uid,
          email: mail,
          password: pass,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMensagge = error.message;
      });
  });
  return divRegister;
};
