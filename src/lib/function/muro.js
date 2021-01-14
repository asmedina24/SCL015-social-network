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
                  <button id="like_" value="${doc.id}">Me gusta ${doc.data().meGusta}</button>
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
              const postRef = firestore.collection('coment').doc(doc.id);

              postRef.update({
                comentarios: comentarioModal,
              })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                });
            }
            // modal.style.display = 'none';
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
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const displayNameData = currentUserData.displayName;
    // console.log(currentUserData)

    firestore.collection('coment').onSnapshot(() => {
      // console.log(firestore.collection('coment').where("userid","==",currentUserData.uid));
      const lista = document.querySelector('#public_muro');
      const like = lista.querySelectorAll('#like_');
      like.forEach((likebutton) => {
        likebutton.addEventListener('click', (e) => {
          // contentMuro.guardarlike();
          const increment = firebase.firestore.FieldValue.increment(1);
          // const decrement = firebase.firestore.FieldValue.increment(-1);
          // console.log(e.target.value);
          const postRef = firestore.collection('coment').doc(e.target.value);

          postRef.get().then((doc) => {
            console.log(doc.id);
            // const likedocrefid = firestore.collection('likes').doc(doc.docuid);
            if (doc.exists && doc.id === e.target.value) {
              firestore.collection('likes').add({
                docuid: doc.id,
                meGusta: 1,
                userid: uid,
                nombre: displayNameData,

              }).then((gusta) => {
                console.log('actualizo likes');
                if (uid !== gusta.userid) {
                  // && uid !== doc.userid
                  // console.log('Document written with ID: ', docRef.id);
                  firestore.collection('coment').doc(e.target.value).update({
                    meGusta: increment,

                  }).then(() => {
                    console.log('sumo likes');
                    if (uid !== gusta.userid) {
                      firestore.collection('likes').doc(doc.docuid).delete()
                        .then(() => {
                          firestore.collection('coment').doc(e.target.value).update({
                            meGusta: increment,
                          })
                            .then(() => {
                              console.log('resto like');
                            })
                            .catch((error) => {
                              console.error('Error removing document: ', error);
                            });
                        });
                    } else {
                      console.log('-------');
                    }
                  })

                    .catch(() => {
                      console.error('error al sumar likes');
                    });

                  // console.log(contador);
                  console.log('Document data:', doc.data());
                }
              })
                .catch(() => {
                  console.error('error al actualizar likes');
                });
            } else {
              console.log('probando no deberias salir');
            }

            // firestore.collection('likes').doc(doc.docuid).delete()
            //   .then(() => {
            //     firestore.collection('coment').doc(e.target.value).update({
            //       meGusta: decrement,
            //     })
            //       .then(() => {
            //         console.log('resto like');
            //       })
            //       .catch((error) => {
            //         console.error('Error removing document: ', error);
            //       });
            //   })
            //   .catch((error) => {
            //     console.error('Error removing document: ', error);
            //   });

            // else {
            //   firestore.collection('likes').doc(doc.docuid).delete()
            //     .then(() => {
            //       // console.log(evento);
            //       firestore.collection('coment').doc(e.target.value).update({
            //         meGusta: decrement,
            //       })
            //         .then(() => {
            //           console.log('resto like');
            //           // console.log(contador);
            //         })
            //         .catch((error) => {
            //           console.error('Error removing document: ', error);
            //         });
            //     })
            //     .catch((error) => {
            //       console.error('Error removing document: ', error);
            //     });

            //   // doc.data() will be undefined in this case
            //   console.log('No such document!');
            // }

            // console.log(doc.data().meGusta);
          }).catch((error) => {
            console.log('Error getting document:', error);
          });
        });
      });
    });
  },
};
export default contentMuro;
