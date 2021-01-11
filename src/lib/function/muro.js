const contentMuro = {
  guardar: () => {
    const comentario = document.getElementById('coment_muro').value;
    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const displayNameData = currentUserData.displayName;
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
  },
  publicar: () => {
    const firestore = firebase.firestore();
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      const currentUserData = firebase.auth().currentUser;
      const displayNameData = currentUserData.displayName;
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((doc) => {
        lista.innerHTML += `<div id="postDiv-${doc.id}">
          <div class="text-area"> 
                  <p>${doc.data().nombre}</p>
                  <p class="" id= "editarComent"> ${doc.data().comentarios}</p>
                  <p class=""> ${doc.data().date}</p>
                 
                   </div>
                  <button id="delete_" value="${doc.id}">Borrar</button>
                  <button class="" id="icon_${doc.id}">Me gusta</button>
                  </div>
                  
                  <div class="commentDiv">
                    </div> <div id="modal_${doc.id}" style="" class="modal">
                    <div class="text-area">
                    <div class="header_modal">
                    <button type="button" class="close">X</button>
                    </div>
                    <div class="cuerpo_modal">
                        <div class= "letrasdentromodal" id="editComen_" value="${doc.id}"><strong>Comentario:</strong>${doc.data().comentarios}</div>
                        <div class= "letrasdentromodal"><strong>nombre:</strong>${displayNameData}</div>
                        <button id="edit_" value="${doc.id}" data-id="${doc.id}">Editar</button>
                                    
                    </div>
                </div>
            </div>`;
      });
    });
  },
  // modal: () => {
  //       const lista = document.querySelector('#public_muro');
  //       lista.innerHTML = '';
  //       querySnapshot.forEach((doc) => {
  //           elemento.addEventListener('click', function () {
  //               document.getElementById('modal_').style.display = "flex"; //igual al block
  //           });
  //       }),
  // },

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

  // likes: (doc) => {
  //   const likes = document.querySelector('#icon_');
  //   console.log(doc);
  //   firebase.firestore().collection('likes').doc().update({
  //     likes,
  //   });
  //   likes.addEventListener('click', () => {
  //     console.log('icon_');
  //     // firebase.firestore().collection('coment').doc().update({
  //     //   likes,
  //   });

  // document.getElementById('icon_').innerHTML = likes + 1;
  // },

  editar1: () => {
    // document.getElementById('edit_').value = nombre;
    const firestore = firebase.firestore();
    // const comentModal = document.querySelectorAll('#editComen_');
    firestore.collection('coment').onSnapshot(() => {
      const comentario = document.getElementById('coment_muro');
      // const editarComent = document.querySelector('#editComen_');
      const currentUserData = firebase.auth().currentUser;
      const displayNameData = currentUserData.displayName;
      const uid = currentUserData.uid;
      const lista = document.querySelector('#public_muro');
      const editComent = lista.querySelectorAll('#edit_');
      editComent.forEach((editbutton) => {
        editbutton.addEventListener('click', (e) => {
          const postRef = firestore.collection('coment').doc(e.target.value);
          console.log(postRef.comentario);
          return postRef.update({
            nombre: displayNameData,
            userid: uid,
          }).then(() => {
            console.log(e.target.dataset.id);
            console.log(e.target);
            console.log(comentario);
            console.log(displayNameData);
            console.log(currentUserData.email);
            console.log(uid);
          })
            .catch((error) => {
              console.error('no edito coment:', error);
            });
        });
      });
    });
  },
};
export default contentMuro;
