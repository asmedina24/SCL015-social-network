export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `
  <fieldset>
  
      <form action="">
      <label for="">Nombre</label>
      <input type="text" alt="" value="" name="">
      <br>
      <br>
      <label for="">Apellido</label>
      <input type="text" alt="" value="" name="">
      <br>
      <br>
      <label for="">Correo</label>
      <input type="mail" alt="" value="" name="">
      <br>
      <br>
      <label for="">Contraseña</label>
      <input type="password" alt="" value="" name="">
      <br>
      <br>
      </form>
      <button id="enviar">Enviar</button>
      </fieldset> 
    `;

  divRegister.innerHTML = viewRegister;
  return divRegister;
};
