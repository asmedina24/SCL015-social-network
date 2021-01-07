export const muro = () => {
  const currentUserData = firebase.auth().currentUser;
  const uid = currentUserData.uid;
  console.log(currentUserData);
  const displayNameData = currentUserData.displayName;
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro"> 
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <p  class="titulo_muro">${displayNameData}</p>
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
                <button id="delete" value="${doc.id}">Borrar</button>
                <button class="" onlick="editar('${doc.id}')">Editar</button>
                </div>
                <div class="commentDiv">
                  </div>`;
      // conseguir id de coment
      // const coment = firestore.collection('coment');
      // coment
      //   .onSnapshot((snap) => {
      //     const usuario = [];
      //     snap.forEach((snaphijo) => {
      //       usuario.push({
      //         id: snaphijo.id,
      //         ...snaphijo.data(),
      //       });
      //     });
      //     console.log(usuario);
      //   });

      const borrar = divMuro.querySelectorAll('#delete');
      borrar.forEach((deletebutton) => {
        deletebutton.addEventListener('click', (e) => {
          console.log(e.target.value);
          console.log(uid);
          console.log(doc.data().userid);
          if (uid === doc.data().userid) {
            alert('seguro deseas eliminar');
            firestore.collection('coment').doc(e.target.value).delete()
              .then()
              .catch((error) => {
                console.error('Error removing document: ', error);
              });
            console.log('borrado satisfactoriamente :)');
          } else {
            alert('No puedes elimiar un mensaje que no es tuyo');
            console.log('son diferente id');
          }
        });
      });
    });
  });
  return divMuro;
};
