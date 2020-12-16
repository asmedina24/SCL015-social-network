import { login } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
<h1>BIenvenidos a nuestra pagina</h1> 
    <form action="" id= 'form_login'>
    <label for="">Mail</label>
    <input type="mail" id = 'mail_login' alt="" value="" name="" required>
    <br>
    <br>
    <label for="">Contraseña</label>
    <input type="password" id = 'pass_login' alt="" value="" name="" required>
    <br>
    <br>
    <button id="register">Entar</button>
    </form>
    <br>
    <br>

    <h2>¿Aun no te registras?</h2>
    <button><a href="#/register" class="btn">registrate</a></button>
    <br>
    <br>
    <hr>
    <img src="./img/LogoGoogle.png" alt="">
    <button id="loginGoogle">Ingresar con Google</button>
    
  
`;
  divHome.innerHTML = viewHome;
  const btn = divHome.querySelector('#loginGoogle');
  btn.addEventListener('click', () => {
    login();
  });
  const loginNew = divHome.querySelector('#register');
  
  loginNew.addEventListener('click', () => {
    const mailLogin = document.getElementById('mail_login').value;
    const passLogin = document.getElementById('pass_login').value;
    
    console.log(mailLogin);
    console.log(passLogin);
    firebase.auth().signInWithEmailAndPassword(mailLogin, passLogin)
      .then((user) => {
        console.log(user);
        const form = divHome.querySelector('#form_login');
        form.reset();
        window.location = ('#/muro');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  });

  return divHome;
};
