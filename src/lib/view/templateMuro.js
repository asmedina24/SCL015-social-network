import contentMuro from '../function/muro.js';

export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro"> 
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
  <button id="btn_muro">Publicar</button>
  </form>
   <div id="public_muro"></div>
 
  <br>
  <br>
  <br>
  <br>
  <br>
  </div>  
         `;
  divMuro.innerHTML = ViewMuro;
  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const formMuro = document.getElementById('form_muro');
    contentMuro.guardar();
    formMuro.reset();
  });
  contentMuro.publicar();
  contentMuro.borrar();

  // contentMuro.editar();
  return divMuro;
};
