export const login = () => {
  const divLogin = document.createElement('div');
  const viewlogin = `
    <form action="" id='form_login'>
    <label for="">Mail</label>
    <input type="mail" id='mail_login' alt="" value="" name="">
    <label for="">Contraseña</label>
    <input type="password" id='pass_login' alt="" value="" name="">
    </form>
    <button id="register">Registrate</button>
    <button id="logingoogle">Ingresar con Google</button>
  `;

  divLogin.innerHTML = viewlogin;
  return divLogin;
};
