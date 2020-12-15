export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = ` <div id="muro">
  <div id="public_muro"> </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <form action="" id ="form_muro">
  <textarea name="" id="coment_muro" cols="30" rows="10"></textarea>
  <button id="btn_muro">Publicar</button>
  </form>
        </div>  
      
       `;
  divMuro.innerHTML = ViewMuro;
  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const comentario = document.getElementById('coment_muro').value;
    const comentPublicado = document.getElementById('public_muro');
    comentPublicado.innerHTML = comentario;
    const formMuro = document.getElementById('form_muro');
    formMuro.reset();
  });
  return divMuro;
};
