export const muro = () => {
  const divMuro = document.createElement('div');
  const viewMuro = `
      <form action="" id='form_login'>
      <label for="">Muro</label>
      <input type="text" id='muro' alt="" value="" name="">
      </form>
    `;

  divMuro.innerHTML = viewMuro;
  return divMuro;
};
