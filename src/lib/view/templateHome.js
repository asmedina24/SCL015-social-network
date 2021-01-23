import contentLogin from '../function/login.js';

export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
  <div class = "home_style">
    <div class="home_2">
        <img class = "img_centerpet" src="./img/Fondo.jpg">
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
              </form>
              <div>
                  <button type="button" id="loginMail" class="loginMail">Ingresar</button>
              </div>
                  <br>
                  <br>
                  <h3 class="miembrologin">¿Aún no eres miembro?</h3>
                  <button class = "btn_register"><a href="#/register">Únete ahora</a></button>
                  <br>
                  <br>
                  <fieldset class= "linea_fieldset">
                    <legend>ó</legend>
                  </fieldset>
                  <div class="div_btns_home">
                      <button class="btns_google" id="loginGoogle"><img src="./img/LogoGoogle.png" class="img_google">Ingresar con Google</button>
                      <button class="btns_face" id="loginFace"><img src="./img/logoFace.png" class="img_face">Ingresar con Facebook</button>
                  </div>    
          </fieldset>  
        </div>
    </div>
  </div>`;
  divHome.innerHTML = viewHome;

  const btnGooogle = divHome.querySelector('#loginGoogle');
  btnGooogle.addEventListener('click', () => {
    contentLogin.loginGoogle();
  });
  const btnFace = divHome.querySelector('#loginFace');
  btnFace.addEventListener('click', () => {
    contentLogin.loginFace();
  });
  const loginNew = divHome.querySelector('#loginMail');

  loginNew.addEventListener('click', () => {
    console.log('Hola');
    const mailLogin = document.getElementById('mail_login').value;
    const passLogin = document.getElementById('pass_login').value;
    contentLogin.login(mailLogin, passLogin);
  });
  return divHome;
};
