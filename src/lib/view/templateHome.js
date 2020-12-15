import { login } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
<h1>BIenvenidos a nuestra pagina</h1> 
    <form action="">
    <label for="">Mail</label>
    <input type="mail" alt="" value="" name="">
    <br>
    <br>
    <label for="">Contraseña</label>
    <input type="password" alt="" value="" name="">
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

  return divHome;
};
