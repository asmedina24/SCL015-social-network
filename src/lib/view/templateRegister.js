export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `
  <fieldset>
  
      <form action="" id='form_register'>
      <label for="">Nombre</label>
      <input type="text" id='name_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Apellido</label>
      <input type="text" id='ape_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Correo</label>
      <input type="mail" id='mail_register' alt="" value="" name="">
      <br>
      <br>
      <label for="">Contraseña</label>
      <input type="password" id='pass_register' alt="" value="" name="">
      <br>
      <br>
      </form>
      <button id="enviar">Enviar</button>
      </fieldset> 
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#enviar');
  enviar.addEventListener('click', () => {
    const mail = document.getElementById('mail_register').value;
    const pass = document.getElementById('pass_register').value;
    console.log(mail);
    console.log(pass);
    firebase.auth().createUserWithEmailAndPassword(mail, pass)
      .then((userCredential) => {
        const form = divRegister.querySelector('#form_register');
        form.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMensagge = error.message;
      });
  });
  return divRegister;
};

/* export const register = () => {
  const divRegister = document.createElement('div');
  const viewRegister = `
  <fieldset>
      <form id='signup-form'>
      <label for="">Nombre</label>
      <input type="text" alt="" value="" name="">
      <br>
      <br>
      <label for="">Apellido</label>
      <input type="text" alt="" value="" name="">
      <br>
      <br>
      <label for="">Correo</label>
      <input type="mail" id='signup-mail' alt="" value="" name="">
      <br>
      <br>
      <label for="">Contraseña</label>
      <input type="password"  id='signup-password' alt="" value="" name="">
      <br>
      <br>
      <button id="enviar">Enviar</button>
      </form>
      </fieldset>
    `;

  divRegister.innerHTML = viewRegister;
  const enviar = divRegister.querySelector('#enviar');
  enviar.addEventListener('click', () => {
    const mail = document.getElementById('signup-mail').value;
    const password = document.getElementById('signup-password').value;
    console.log(mail);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(mail, password)
      .then((user) => {
        console.log('¡Creamos al usuario!');
      })
      .catch((error) => {
        console.error(error);
        console.log(mail);
        console.log(password);
      });
  });
  return divRegister;
}; */
