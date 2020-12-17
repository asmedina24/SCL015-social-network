import { login } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = ` <div class = "home_style">
  <div class= "caja">
  <img class='img_centerpet' src="/img/Fondo.jpg">
<h1 class = "contenc_home"></h1> 
<div class= "caja_login">
<fieldset class= 'login'>
   <form action="" id= 'form_login'>
   <h3> Login </h1> 
    <label for="">Mail</label>
    <input type="mail" id = 'mail_login' alt="" value="" name="" required>
    <br>
    <br>
    <label for="">Contraseña</label>
    <input type="password" id = 'pass_login' alt="" value="" name="" required>
    <br>
    <br>
    <button id="login">Entrar</button>
    </form>
    <br>
    <br>

    <h2>¿Todavía no eres miembro?</h2>
    <button class = "btn_register"><a href="#/register" class="btn">Únete</a></button>
    <br>
    <br>
    <hr>
    <img src="./img/LogoGoogle.png" alt="">
    <button id="loginGoogle">Ingresar con Google</button>
    </div>
    </fieldset>  
    </div>
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

    console.log(mailLogin);
    console.log(passLogin);
    firebase.auth().signInWithEmailAndPassword(mailLogin, passLogin)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const emailVerified = user.emailVerified;
            if (emailVerified === false) {
              alert('verifica tu correo');
            } else {
              window.location = ('#/muro');
            }
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('no esta registrado');
        window.location = ('#/register');
      });
  });
  return divHome;
};
