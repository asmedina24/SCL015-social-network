const firestore = firebase.firestore();
const contentMuro = {
  guardar: () => {
    const comentario = document.querySelector('#coment_muro').value;
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const displayNameData = currentUserData.displayName;
    const fecha = new Date(firebase.firestore.Timestamp.now().seconds * 1000).toLocaleDateString();

    firestore.collection('coment').add({
      comentarios: comentario,

      date: fecha,
      userid: uid,
      nombre: displayNameData,
      meGusta: 0,

    }).then(() => {

    })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  },
  getDetailLike: (documento, usuario) => {
    firestore.collection('likes').where('docuid', '==', documento).where('userid', '==', usuario)
      .get()
      .then((objeto) => {
        document.getElementById(`contenedor_botnes_like_${documento}`).innerHTML = `
        <div id="div_like_${documento}" style="display:${(objeto.size > 0 ? 'none' : 'block')};">
         <button id="like_${documento}" class ="btn_like" value="${documento}"><img src="../img/like.png">Like</button>
        </div>
        <div id="div_dislike_${documento}" style="display:${(objeto.size > 0 ? 'block' : 'none')};">
          <button id="deslike_${documento}" class="btn_dislike" value="${documento}"><img src="../img/like.png">Dislike</button>
        </div>`;
        contentMuro.likes(documento, usuario);
        contentMuro.dislike(documento, usuario);
      });
  },
  getCantidadLikes: (documento) => {
    firestore.collection('likes').where('docuid', '==', documento)
      .get()
      .then((objeto) => {
        document.getElementById(`contenedor_cantidad_likes_${documento}`).innerHTML = `
        <p> ${objeto.size}</p>`;
      });
  },
  publicar: () => {
    const currentUserData = firebase.auth().currentUser;

    const uid = currentUserData.uid;

    // const displayNameData = currentUserData.displayName;
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((doc) => {
        // parte 1
        lista.innerHTML += `<div id="postDiv-${doc.id}" class="postdiv">
          <div class="text-area"> 
          <p>${doc.data().nombre}</p>
          <p class=""> ${doc.data().comentarios}</p>
          <p class=""> ${doc.data().date}</p>
          <br>
          <br>
          <br>
          <div id="contenedor_cantidad_likes_${doc.id}"></div>
          <button id="delete_" value="${doc.id}">Borrar</button> 
          <button id="edit_" value="${doc.id}">Editar</button>
          <div id="contenedor_botnes_like_${doc.id}">
        <div id="modal_muro-"></div></div>`;
        contentMuro.getDetailLike(doc.id, uid);
        contentMuro.getCantidadLikes(doc.id);
      });
      contentMuro.editar();
    });
  },
  borrar: () => {
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
  editar: () => {
    const lista = document.querySelector('#public_muro');
    const editar = lista.querySelectorAll('#edit_');
    // const modales = document.getElementsByClassName('close');

    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;

    firestore.collection('coment').onSnapshot(() => {
      editar.forEach((editbutton) => {
        editbutton.addEventListener('click', (e) => {
          const postRef = firestore.collection('coment').doc(e.target.value);
          postRef.get().then((doc) => {
            if (doc.exists) {
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
  publicarEditar: () => {
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#postDiv-');
      const modal = lista.querySelector('#modal_muro-');
      modal.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const prueba = firestore.collection('coment').doc(doc.id);
        console.log(prueba.id, doc.exists, doc.id);
        modal.innerHTML += (`<div id="modal_${doc.id}" class="modal">
        <div class="contenedor_modal">
        <div class="header_modal">
        <button type="button" id="btn_cerrar_${doc.id}" class="close">X</button>
        </div>
        <div class="cuerpo_modal">
        <form id ="form_modal">
        <textarea name="" id="coment_modal${doc.id}" cols="20" rows="10">${doc.data(doc.id).comentarios}</textarea>
        <button id="btn_modal_${doc.id}" value="${doc.id}">Publicar</button>
        </form>
        </div>
        </div>
        </div>`);
        const modaldoc = document.querySelector(`#modal_${doc.id}`);
        const btnEditar = modaldoc.querySelector(`#btn_modal_${doc.id}`);
        btnEditar.addEventListener('click', () => {
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
  likes: (documento, usuario) => {
    const contenedorLike = `div_like_${documento}`;
    const contenedorDislike = `div_dislike_${documento}`;
    const btnLike = document.getElementById(`like_${documento}`);
    btnLike.addEventListener('click', (e) => {
      const postRef = firestore.collection('coment').doc(e.target.value);
      postRef.get().then((doc) => {
        if (doc.exists && doc.id === e.target.value) {
          firestore.collection('likes').add({
            docuid: doc.id,
            meGusta: 1,
            userid: usuario,
          }).then(() => {
            document.getElementById(contenedorLike).style.display = 'none';
            document.getElementById(contenedorDislike).style.display = 'block';
            contentMuro.getCantidadLikes(doc.id);
          })
            .catch(() => {
              console.error('error al actualizar likes');
            });
        } else {
          console.log('probando no deberias salir');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    });
  },
  dislike: (documento, usuario) => {
    const deslike = document.getElementById(`deslike_${documento}`);
    const contenedorLike = `div_like_${documento}`;
    const contenedorDislike = `div_dislike_${documento}`;
    deslike.addEventListener('click', () => {
      firestore.collection('likes').where('docuid', '==', documento).where('userid', '==', usuario)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              console.log('Document successfully deleted!');
            }).catch((error) => {
              console.error('Error removing document: ', error);
            });
          });
          document.getElementById(contenedorLike).style.display = 'block';
          document.getElementById(contenedorDislike).style.display = 'none';
          contentMuro.getCantidadLikes(documento);
        });
    });
  },
  cerrarsesion: () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('Sesion cerrada correctamente');
        window.location = ('#/home');
      }).catch((error) => {
        console.log('no puede cerrar sesion', error);
      });
  },
};
export default contentMuro;
