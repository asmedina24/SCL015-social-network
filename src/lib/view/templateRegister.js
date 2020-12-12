export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `
      <form action="">
      <label for="">Nombre</label>
      <input type="text" alt="" value="" name="">
      <label for="">Apellido</label>
      <input type="text" alt="" value="" name="">
      <label for="">Correo</label>
      <input type="mail" alt="" value="" name="">
      <label for="">Contraseña</label>
      <input type="password" alt="" value="" name="">
      </form>
      <button id="enviar">Enviar</button>
      
    `;

  divRegister.innerHTML = viewRegister;
  return divRegister;
};
