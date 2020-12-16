export const login = () => {
  const divLogin = document.createElement('div');
  const viewlogin = `
    <form action="" id='form_login'>
    <label for="">Mail</label>
    <input type="mail" id='mail_login' alt="" value="" name="">
    <label for="">Contraseña</label>
    <input type="password" id='pass_login' alt="" value="" name="">
    <button id="login">Entrar</button>
    </form>
    <button id="logingoogle">Ingresar con Google</button>
  `;

  divLogin.innerHTML = viewlogin;
  const loginbtn = divLogin.querySelector('#login');
  loginbtn.addEventListener('click', () => {
    const mail = document.getElementById('mail_login').value;
    const pass = document.getElementById('pass_login').value;
    firebase.auth().signInWithEmailAndPassword(mail, pass)
      .then((user) => {
        const form = divLogin.querySelector('#form_login');
        form.reset();
        window.location = ('#/muro');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    console.log(firebase.auth().signInWithEmailAndPassword(mail, pass));
  });
  return divLogin;
};
