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
      <button type="submit" id="registrar">Registrar</button>
      </form>
      </fieldset> 
      <img class="circulo_registro" src="./img/Ellipse_2.png">
      <img src="./img/image_7.png" class="perritos_registro" alt="">
      </div>
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#form_register');
  enviar.addEventListener('submit', () => {
    const mail = document.getElementById('mail_register').value;
    const pass = document.getElementById('pass_register').value;
    const name = document.getElementById('name_register').value;
    const lastName = document.getElementById('ape_register').value;
    firebase.auth().createUserWithEmailAndPassword(mail, pass)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification().then(() => {
          const firestore = firebase.firestore();
          // const docRef = firestore.doc('samples/registro');
          firestore.collection('user').add({
            nombre: name,
            apellido: lastName,
            correo: mail,
            contraseña: pass,
          })
            .then(() => {
              window.location = ('#/home');
            });
        });
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        return user.updateProfile({
          displayName: name + lastName,
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
    firebase.auth().signOut().then(() => {
      // eslint-disable-next-line no-alert
      alert('verifica tu correo');
    });
  });
  return divRegister;
};
