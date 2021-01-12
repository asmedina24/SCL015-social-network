const contentMuro = {
  guardar: () => {
    const comentario = document.querySelector('#coment_muro').value;
    // const likes = document.querySelector('#btnLikes_');
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
      meGusta: 0,

    }).then(() => {
      // console.log('Document written with ID: ', docRef.id);
    })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  },
  publicar: () => {
    const firestore = firebase.firestore();
    firestore.collection('coment').orderBy('date', 'asc').onSnapshot((querySnapshot) => {
      // const currentUserData = firebase.auth().currentUser;
      // const displayNameData = currentUserData.displayName;
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((doc) => {
        lista.innerHTML += `<div id="postDiv-">
          <div class="text-area"> 
                  <p>${doc.data().nombre}</p>
                  <p class="" id= "editarComent"> ${doc.data().comentarios}</p>
                  <p class=""> ${doc.data().date}</p>
                 
                   </div>
                  <button id="delete_" value="${doc.id}">Borrar</button>
                  <button id="edit_" value="${doc.id}">Editar</button>
                  <button id="btnLikes_" value "${doc.id}">Me gusta</button>
                  <div id="modal_muro"></div>
                  </div>
                  `;
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
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#postDiv-');
      const modal = lista.querySelector('#modal_muro');
      modal.innerHTML = '';
      querySnapshot.forEach((doc) => {
        modal.innerHTML = (`<div id="modal_${doc.id}" class="modal">
                <div class="contenedor_modal">
                <div class="header_modal">
                <button type="button" id="btn_cerrar_${doc.id}" class="close">X</button>
                </div>
                <div class="cuerpo_modal">
                <form id ="form_modal">
                <textarea name="" id="coment_modal${doc.id}" cols="20" rows="10">${doc.data().comentarios}</textarea>
                <button id="btn_modal_${doc.id}" value="${doc.id}">Publicar</button>
                </form>
                </div>
                </div>
                </div>`);
        // const firestore = firebase.firestore();

        // const modal = document.querySelector('#modal_muro');
        const modalId = modal.querySelector(`#modal_${doc.id}`);
        const btnEditar = modalId.querySelector(`#btn_modal_${doc.id}`);
        btnEditar.addEventListener('click', (e) => {
          const comentarioModal = document.getElementById(`coment_modal${doc.id}`).value;
          console.log('hola');
          if (doc.exists) {
            console.log('este es', 'Document data:', doc.data());
            if (doc.data().userid !== uid) {
              alert('no es tu comentario');
              // const modal = lista.querySelector('#modal_muro');
              // modal.style.display = 'flex';
            } else {
              console.log('else');
              console.log(doc.id);
              console.log(comentarioModal);
              const postRef = firestore.collection('coment').doc(doc.id);
              console.log(postRef);
              postRef.update({
                comentarios: comentarioModal,
              })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                });
              modal.closest('.modal').style.display = 'none';
            }
          }
        });
        // const btnCerrar = modal.getElementsByClassName('close');
        // btnCerrar.addEventListener('click', () => {
        //   btnCerrar.closest('.modal').style.display = 'none';
        // });
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
                contentMuro.publicarEditar();
              } else {
                alert('no es tu comentario');
              }
            }
          });
        });
      });
    });
  },

  likes: () => {
    const firestore = firebase.firestore();
    firestore.collection('coment').onSnapshot(() => {
      const btnlike = document.querySelectorAll('#btnLikes_');
      btnlike.forEach((btnMegust) => {
        btnMegust.addEventListener('click', () => {
          firestore.collection('coment').onSnapshot((idmeGusta) => {
            idmeGusta.forEach((doc) => {
              const postRef = firestore.collection('coment').doc(doc.id);
              postRef.update({
                meGusta: doc.data().meGusta + 1,
              });
              document.getElementById('btnLikes_').innerHTML = doc.data().meGusta + 1;
              console.log(doc.id);
              console.log(doc.data().meGusta);
            });
          });
          // document.getElementById(`btnLikes_${idmeGusta}`).innerHTML = meGusta + 1;
          // console.log('por lo menos toma el boton');
        });
      });
    });
  },

  //   const f
  // modal: () irestore = firebase.firestore();
  //   const lista = document.querySelector('#public_muro');
  //   const modal = lista.querySelector('#modal_muro');
  //   firestore.collection('coment').onSnapshot((querySnapshot) => {
  //     modal.innerHTML = '';
  //     querySnapshot.forEach((doc) => {
  //       modal.innerHTML += (`<div id="modal_${doc.id}" class="modal">
  //               <div class="contenedor_modal">
  //               <div class="header_modal">
  //               <button type="button" class="close">X</button>
  //               </div>
  //               <div class="cuerpo_modal">
  //               <form id ="form_modal">
  // eslint-disable-next-line max-len
  //               <textarea name="" id="coment_modal${doc.id}" cols="20" rows="10">${doc.data().comentarios}</textarea>
  //               <button id="btn_modal" value="${doc.id}">Publicar</button>
  //               </form>
  //               </div>
  //               </div>
  //               </div>`);
  //     });
  //     contentMuro.publicarEditar();
  //   });
  // },
};
export default contentMuro;
