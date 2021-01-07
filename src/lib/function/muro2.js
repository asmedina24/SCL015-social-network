const contentMuro = {
  guardar: () => {
    const comentario = document.querySelector('#coment_muro').value;
    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const displayNameData = currentUserData.displayName;

    // const myDate = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    // new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString(),
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
  },
  publicar: () => {
    const firestore = firebase.firestore();
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((doc) => {
        lista.innerHTML += `<div id="postDiv-${doc.id}">
          <div class="text-area"> 
                  <p>${doc.data().nombre}</p>
                  <p class=""> ${doc.data().comentarios}</p>
                  <p class=""> ${doc.data().date}</p>
                 
                   </div>
                  <button id="delete_" value="${doc.id}">Borrar</button>
                  <button id="edit_" value="${doc.id}">Editar</button>
                  <button class="">Me gusta</button>
                  </div>
                  <div id="modal_muro"></div>`;
      });
      contentMuro.editar();
    });
  },
  borrar: () => {
    const firestore = firebase.firestore();
    firestore.collection('coment').onSnapshot(() => {
      const currentUserData = firebase.auth().currentUser;
      const uid = currentUserData.uid;
      const lista = document.querySelector('#public_muro');
      const borrar = lista.querySelectorAll('#delete_');
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
  },
  publicarEditar: () => {
    const firestore = firebase.firestore();
    const comentarioModal = document.getElementById('coment_muro').value;
    const modal = document.querySelector('#modal_muro');
    const btnEditar = modal.querySelectorAll('#btn_modal');
    btnEditar.forEach((editbutton) => {
      editbutton.addEventListener('click', (e) => {
        const postRef = firestore.collection('coment').doc(e.target.value);
        return postRef.update({
          comentarios: comentarioModal,
        })
          .then(() => {
            console.log('Document successfully updated!');
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error);
          });
      });
    });
  },
  editar: () => {
    const lista = document.querySelector('#public_muro');
    const editar = lista.querySelectorAll('#edit_');
    // const modales = document.getElementsByClassName('close');
    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;

    firestore.collection('coment').onSnapshot(() => {
      editar.forEach((editbutton) => {
        editbutton.addEventListener('click', (e) => {
          const postRef = firestore.collection('coment').doc(e.target.value);
          postRef.get().then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
              if (doc.data().userid === uid) {
                // const modal = lista.querySelector('#modal_muro');
                // modal.style.display = 'flex';
                contentMuro.modal();
              } else {
                alert('no es tu comentario');
              }
            }
          });
        });
      });
    });
  },
  modal: () => {
    const firestore = firebase.firestore();
    const lista = document.querySelector('#public_muro');
    const modal = lista.querySelector('#modal_muro');
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      modal.innerHTML = '';
      querySnapshot.forEach((doc) => {
        modal.innerHTML += (`<div id="modal_${doc.id}" class="modal">
                <div class="contenedor_modal">
                <div class="header_modal">
                <button type="button" class="close">X</button>
                </div>
                <div class="cuerpo_modal">
                <form id ="form_modal">
                <textarea name="" id="coment_modal" cols="20" rows="10">${doc.data().comentarios}</textarea>
                <button id="btn_modal">Publicar</button>
                </form>
                </div>
                </div>
                </div>`);
      });
      contentMuro.publicarEditar();
    });
  },
};
export default contentMuro;
