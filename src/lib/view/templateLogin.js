export const login = () => {
  const divLogin = document.createElement('div');
  const viewlogin = `
    <form action="">
    <label for="">Mail</label>
    <input type="mail" alt="" value="" name="">
    <label for="">Contraseña</label>
    <input type="password" alt="" value="" name="">
    </form>
    <button id="register">Registrate</button>
    <button id="logingoogle">Ingresar con Google</button>
  `;

  divLogin.innerHTML = viewlogin;
  return divLogin;
};
