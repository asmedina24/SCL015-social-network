export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = `  <h3>¿Qué estas pensando?</h3>
  <form action="" id ="form_muro">
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
  <button id="btn_muro">Publicar</button>
  </form><div id="muro">
  <div id="public_muro"> <ul id="lista_comentario"></ul> </div>
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
    const comentario = document.getElementById('coment_muro').value;
    const comentPublicado = document.getElementById('public_muro');
    const lista = document.getElementById('lista_comentario');
    const listaComentario = document.createElement('p');
    listaComentario.appendChild(document.createTextNode(comentario));
    lista.appendChild(listaComentario);
    // comentPublicado.innerHTML += comentario;
    const formMuro = document.getElementById('form_muro');
    formMuro.reset();
  });
  return divMuro;
};
