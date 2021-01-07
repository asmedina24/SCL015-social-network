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
    // const myDate = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    firestore.collection('coment').add({
      comentarios: comentario,
      // date: myDate,
      date: new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
      userid: uid,
      nombre: displayNameData,

    }).then(() => {
      // console.log('Document written with ID: ', docRef.id);
    })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });

  const firestore = firebase.firestore();
  firestore.collection('coment').onSnapshot((querySnapshot) => {
    const lista = document.getElementById('public_muro');
    lista.innerHTML = '';
    querySnapshot.forEach((doc) => {
      lista.innerHTML += `<div id="postDiv-${doc.id}">
        <div class="text-area"> 
                <p>${doc.data().nombre}</p>
                <p class=""> ${doc.data().comentarios}</p>
                <p class=""> ${doc.data().date}</p>
               
                 </div>
                <button id="delete_" value="${doc.id}">Borrar</button>
                <button class="">Me gusta</button>
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
    });
    const borrar = lista.querySelectorAll('#delete_');
    console.log(borrar);
    borrar.forEach((deletebutton) => {
      deletebutton.addEventListener('click', (e) => {
        console.log(e.target.value);
        console.log('??????');
        const postRef = firestore.collection('coment').doc(e.target.value);
        postRef.get().then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            if (doc.data().userid !== uid) {
              alert('no es tu comentario');
            // console.log(doc.data().userid);
            // console.log(uid);
            } else {
              firestore.collection('coment').doc(e.target.value).delete()
                .then((evento) => {
                  console.log(evento);
                  console.log('si funciono');
                })
                .catch((error) => {
                  console.error('Error removing document: ', error);
                });
              alert('comentario eliminado');
            }
            console.log('este es id del login', uid);
            console.log('este es el id del comentario', doc.data().userid);
          } else {
          // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      });
    });
  });

  // firestore.collection('coment').doc((querySnapshot) => {
  //   const borrar = divMuro.querySelectorAll(`#delete_${uid}`);
  //   querySnapshot.forEach((doc) => {
  //     borrar.forEach((deletebutton) => {

  //     });
  //   });
  // });
  return divMuro;
};
