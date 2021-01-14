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
          <button id="like_${documento}" class ="btn_like" value="${documento}">Like</button>
        </div>
        <div id="div_dislike_${documento}" style="display:${(objeto.size > 0 ? 'block' : 'none')};">
          <button id="deslike_${documento}" class="btn_dislike" value="${documento}">Dislike</button>
        </div>`;
        contentMuro.likes(documento, usuario);
        contentMuro.dislike();
      });
  },
  getCantidadLikes: (documento) => {
    firestore.collection('likes').where('docuid', '==', documento)
      .get()
      .then((objeto) => {
        document.getElementById(`contenedor_cantidad_likes_${documento}`).innerHTML = `
        <div id="div_like_${documento}" style="display:${(objeto.size > 0 ? 'none' : 'block')};">
          <button id="like_${documento}" class ="btn_like" value="${documento}">Like</button>
        </div>
        <p>Total Likes = ${objeto.size}</p></div>`;
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
        // const firestore = firebase.firestore();

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
  dislike: () => {
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    // console.log(currentUserData)

    firestore.collection('coment').onSnapshot(() => {
      // console.log(firestore.collection('coment').where("userid","==",currentUserData.uid));
      const lista = document.querySelector('#public_muro');
      const deslike = lista.querySelectorAll('.btn_disllike');
      deslike.forEach((deslikebutton) => {
        const contenedorLike = `div_like_${deslikebutton.value}`;
        const contenedorDislike = `div_dislike_${deslikebutton.value}`;
        deslikebutton.addEventListener('click', (e) => {
          // contentMuro.guardarlike();

          const decrement = firebase.firestore.FieldValue.increment(-1);
          // console.log(e.target.value);
          const postRef = firestore.collection('likes').doc(e.target.value);

          postRef.get().then((doc) => {
            console.log(doc.id);
            // const likedocrefid = firestore.collection('likes').doc(doc.docuid);
            if (doc.exists && uid === doc.userid) {
              firestore.collection('likes').doc(doc.id).delete()
                .then(() => {
                  console.log('removio like');
                  firestore.collection('coment').doc(e.target.value).update({
                    meGusta: decrement,
                  })
                    .then(() => {
                      document.getElementById(contenedorLike).style.display = 'none';

                      document.getElementById(contenedorDislike).style.display = 'block';
                      console.log('resto like');
                      // console.log(contador);
                    })
                    .catch(() => {
                      console.log('no resto like');
                    });
                })
                .catch(() => {
                  console.error('no removio like');
                });
              document.querySelectorAll('#div_dislike').style.display = 'none';

              document.querySelectorAll('#div_like').style.display = 'block';
              // doc.data() will be undefined in this case
            } else {
              console.log('probando no deberias salir');
            }
          }).catch((error) => {
            console.log('Error getting document:', error);
          });
        });
      });
    });
  },
};
export default contentMuro;
