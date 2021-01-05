import { login } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = ` <div class = "home_style">
  <img class = "img_centerpet" src="./img/Fondo.jpg">
<h1 class = "contenc_home"></h1> 
<div class= "caja_login">
<img class="img_circulo" src="./img/Ellipse_2.png">
<fieldset class= "login">
   <form action="" id= "form_login">
   <img class="img_mail" src="./img/image_3.png">
    <label class="label_form">Mail</label>
    <input type="mail" class="input_login" id = "mail_login" alt="" value="" name="" required>
    <img class="img_pass" src="./img/image_4.png">
    <label class="label_form">Contraseña</label>
    <input type="password" class="input_login" id = "pass_login" alt="" value="" name="" required>
    <br>
    <br>
    <button id="login">Ingresar</button>
    </form>
    <br>
    <br>
    <h2>¿Aún no eres miembro?</h2>
    
    <button class = "btn_register"><a href="#/register" class="btn">Únete ahora</a></button>
    <br>
    <br>
    <fieldset class= "linea_fieldset">
    <legend>ó</legend>
    </fieldset>
    
    <button id="loginGoogle"><img src="./img/LogoGoogle.png" class="img_google">Ingresar con Google</button>
    </div>
    </fieldset>  
  </div>
    
  
`;
  divHome.innerHTML = viewHome;
  const btn = divHome.querySelector('#loginGoogle');
  btn.addEventListener('click', () => {
    login();
  });
  const loginNew = divHome.querySelector('#login');

  loginNew.addEventListener('click', () => {
    const mailLogin = document.getElementById('mail_login').value;
    const passLogin = document.getElementById('pass_login').value;
    firebase.auth().signInWithEmailAndPassword(mailLogin, passLogin)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const emailVerified = user.emailVerified;
            if (emailVerified === false) {
              // eslint-disable-next-line no-alert
              alert('verifica tu correo');
            } else {
              window.location = ('#/muro');
            }
          }
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;
        alert('no esta registrado');
        window.location = ('#/register');
      });
  });
  return divHome;
};
