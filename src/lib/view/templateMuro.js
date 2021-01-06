export const muro = () => {
  const currentUserData = firebase.auth().currentUser;
  const uid = currentUserData.uid;
  console.log(currentUserData);
  const displayNameData = currentUserData.displayName;
  console.log(displayNameData);
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
    const comentario = document.getElementById('coment_muro').value;
    const formMuro = document.getElementById('form_muro');
    formMuro.reset();
    const firestore = firebase.firestore();
    firestore.collection('coment').add({
      comentarios: comentario,
      date: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
      userid: uid,
      nombre: displayNameData,

    }).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
  const firestore = firebase.firestore();
  firestore.collection('coment', 'user').onSnapshot((querySnapshot) => {
    const lista = document.getElementById('public_muro');
    lista.innerHTML = '';
    querySnapshot.forEach((doc) => {
      lista.innerHTML += `<div id="postDiv-${doc.id}">
        <div class="text-area"> 
                <p>${doc.data().nombre}</p>
                <p class=""> ${doc.data().comentarios}</p>
                <p class=""> ${doc.data().date}</p>
                 </div>
                <button class="" id="delete-${doc.id} ">Editar</button>
                <button class="" id="delete">Borrar</button>
                <button class="">Me gusta</button>
                </div>
                <div class="commentDiv">
                  </div>`;
    });
  });
  return divMuro;
};
