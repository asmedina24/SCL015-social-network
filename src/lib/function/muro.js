// import storage from '../../confiFB.js';

const firestore = firebase.firestore();

const contentMuro = {
  imagen: () => {
    const imgMuro = document.querySelector('#img_muro').files[0];
    console.log(imgMuro);
    const storage = firebase.storage();
    if (!imgMuro) {
      console.log('no subio foto');
    } else {
      const storageRef = storage.ref(`user/${imgMuro.name}`);
      const uploadTask = storageRef.put(imgMuro);
      uploadTask.on('state_changed', (snapshot) => {

      }, (error) => {
        console.log(error);
      }, () => {
        console.log('imagen subida a firebase');
      });
    }
  },
  guardar: () => {
    const comentario = document.querySelector('#coment_muro').value;
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const displayNameData = currentUserData.displayName;
    const date = new Date();
    const fecha = `${
      (`00${date.getDate()}`).slice(-2)}/${(`00${date.getMonth() + 1}`).slice(-2)}/${
      date.getFullYear()} ${
      (`00${date.getHours()}`).slice(-2)}:${
      (`00${date.getMinutes()}`).slice(-2)}:${
      (`00${date.getSeconds()}`).slice(-2)}`;
    firestore.collection('coment').add({
      comentarios: comentario,

      date: fecha,
      userid: uid,
      nombre: displayNameData,
      meGusta: 0,
      dateEditado: '',
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
        <p><img class="total_huella" src="../img/like.png">  ${objeto.size}</p></div>`;
      });
  },
  contenidoMuro: (uid, name) => {
    // const currentUserData = firebase.auth().currentUser;
    // const name = currentUserData.displayName;
    // const uid = currentUserData.uid;
    firestore.collection('coment').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((response) => {
        lista.innerHTML += `
        <div id="postDiv-${response.id}" class="postdiv">
        <p class="user">Usuario: ${response.data().nombre}</p>
          <div class="text-area"> 
          <p class="date"> ${response.data().date}</p>  
          <p class=""> ${response.data().comentarios}</p>
            <br>
            <p class="date_edit"> ${response.data().dateEditado}</p>
          </div>
          <div id="contenedor_cantidad_likes_${response.id}"></div>
          <button id="delete_${response.id}" value="${response.id}">Borrar</button> 
          <button id="btn_edit_${response.id}" value="${response.id}">Editar</button>
          <div id="contenedor_botnes_like_${response.id}"></div>
        </div>
        <br>`;
        contentMuro.getDetailLike(response.id, uid);
        contentMuro.getCantidadLikes(response.id);
        contentMuro.modal(response, uid, name);
        contentMuro.modalBorrar(response, uid);
        contentMuro.btnEditar(response, uid);
        contentMuro.btnBorrar(response, uid);
      });
    });
  },
  btnBorrar: (documento, usuario) => {
    firestore.collection('coment').onSnapshot(() => {
      // const currentUserData = firebase.auth().currentUser;
      // const uid = currentUserData.uid;
      const btnBorrar = `#delete_${documento.id}`;
      const lista = document.querySelector('#public_muro');
      const borrar = lista.querySelectorAll(btnBorrar);

      borrar.forEach((deletebutton) => {
        deletebutton.addEventListener('click', (e) => {
          const postRef = firestore.collection('coment').doc(e.target.value);
          postRef.get().then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
              if (doc.data().userid !== usuario) {
                alert('no es tu comentario');
              } else {
                console.log('paso hacia el modal de borrar');
                const nombreModal = `modal_borrar_${documento.id}`;
                const modal = document.getElementById(nombreModal);
                modal.style.display = 'flex';
              }
            } else {
              console.log('No such document!');
            }
          }).catch((error) => {
            console.log('Error getting document:', error);
          });
        });
      });
    });
  },
  borrar: (value) => {
    firestore.collection('coment').doc(value).delete()
      .then(() => {
        console.log('si funciono');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  },
  modalBorrar: (documento, usuario) => {
    const modalEdit = document.getElementById('seccion_borrar');
    modalEdit.innerHTML += `
    <div id="modal_borrar_${documento.id}" class="modalBorrar">
      <div class="contenedor_modal_">
        <div class="header_modal_">
        </div>
        <div class="cuerpo_modal_">
        <p>¿Estas seguro que quieres eliminar este comentario?</p>
        <button id="acept_borrar_${documento.id}" value="${documento.id}">Aceptar</button>
        <button type="button" id="cance_borrar_${documento.id}" value="${documento.id}">Cancelar</button>
        </div>
      </div>
    </div>`;
    contentMuro.btnBorrar(usuario);
    contentMuro.aceptarBorrar(documento, usuario);
    contentMuro.cerrarBorrar(documento, usuario);
  },
  aceptarBorrar: (documento) => {
    firestore.collection('coment').onSnapshot(() => {
      const btnAceptar = `#acept_borrar_${documento.id}`;
      const aceptar = document.querySelectorAll(btnAceptar);
      aceptar.forEach((aceptarButton) => {
        aceptarButton.addEventListener('click', (e) => {
          if (documento.exists) {
            const nombreModal = `modal_borrar_${documento.id}`;
            const modal = document.getElementById(nombreModal);
            modal.style.display = 'none';
            console.log('borrado correctamente');
            contentMuro.borrar(e.target.value);
          } else {
            console.log('no borro comentario');
          }
        });
      });
    });
  },
  cerrarBorrar: (documento, usuario) => {
    firestore.collection('coment').onSnapshot(() => {
      const btnCancelar = `#cance_borrar_${documento.id}`;
      const cancelar = document.querySelectorAll(btnCancelar);
      cancelar.forEach((cancelbutton) => {
        cancelbutton.addEventListener('click', () => {
          if (documento.exists) {
            if (documento.data().userid !== usuario) {
              alert('no es tu comentario');
            } else {
              console.log('cerro correctamente');
              const nombreModal = `modal_borrar_${documento.id}`;
              const modal = document.getElementById(nombreModal);
              modal.style.display = 'none';
            }
          } else {
            console.log('No such document!');
          }
        });
      });
    });
  },
  modal: (documento, usuario) => {
    const modalEdit = document.getElementById('seccion_modal');
    modalEdit.innerHTML += `
    <div id="modal_${documento.id}" class="modal">
      <div class="contenedor_modal_">
        <div class="header_modal_">
          <button type="button" id="btn_cerrar_${documento.id}" value="${documento.id}" class="close">X</button>
        </div>
        <div class="cuerpo_modal_">
          <form id ="form_modal">
            <textarea class="modal_coment" id="coment_modal_${documento.id}" cols="20" rows="10">${documento.data().comentarios}</textarea>
          </form>
          <button id="btn_modal_${documento.id}" value="${documento.id}">Publicar</button>
        </div>
      </div>
    </div>`;
    contentMuro.guardarCambios(documento);
    contentMuro.cerrarModal(documento, usuario);
  },
  btnEditar: (documento, usuario) => {
    firestore.collection('coment').onSnapshot(() => {
      const lista = document.querySelector('#public_muro');

      const btnEdit = `#btn_edit_${documento.id}`;

      const edit = lista.querySelectorAll(btnEdit);

      edit.forEach((editbutton) => {
        editbutton.addEventListener('click', () => {
          if (documento.exists) {
            if (documento.data().userid !== usuario) {
              alert('no es tu comentario');
            } else {
              console.log('paso hacia el modal');
              const nombreModal = `modal_${documento.id}`;
              const modal = document.getElementById(nombreModal);
              modal.style.display = 'flex';
            }
          } else {
            console.log('No such document!');
          }
        });
      });
    });
  },
  cerrarModal: (documento, usuario) => {
    firestore.collection('coment').onSnapshot(() => {
      const btnCerrar = `#btn_cerrar_${documento.id}`;
      const cerrar = document.querySelectorAll(btnCerrar);
      cerrar.forEach((closebutton) => {
        closebutton.addEventListener('click', () => {
          if (documento.exists) {
            if (documento.data().userid !== usuario) {
              alert('no es tu comentario');
            } else {
              console.log('paso hacia el modal');
              const nomobreModal = `modal_${documento.id}`;
              const modal = document.getElementById(nomobreModal);
              modal.style.display = 'none';
            }
            console.log('este es id del login', usuario);
            console.log('este es el id del comentario', documento.data().userid);
          } else {
            console.log('No such document!');
          }
        });
      });
    });
  },
  guardarCambios: (documento) => {
    const comentModal = `#coment_modal_${documento.id}`;

    firestore.collection('coment').onSnapshot(() => {
      const btnPublicar = `#btn_modal_${documento.id}`;
      const publicar = document.querySelectorAll(btnPublicar);
      publicar.forEach((publicarButton) => {
        publicarButton.addEventListener('click', () => {
          if (documento.exists) {
            const comentario = document.querySelector(comentModal).value;
            const date = new Date();
            const fecha = `${
              (`00${date.getDate()}`).slice(-2)}/${(`00${date.getMonth() + 1}`).slice(-2)}/${
              date.getFullYear()} ${
              (`00${date.getHours()}`).slice(-2)}:${
              (`00${date.getMinutes()}`).slice(-2)}:${
              (`00${date.getSeconds()}`).slice(-2)}`;
            firestore.collection('coment').doc(documento.id).update({
              comentarios: comentario,
              dateEditado: `${fecha}(editado)`,
            });
            const nomobreModal = `modal_${documento.id}`;
            const modal = document.getElementById(nomobreModal);
            modal.style.display = 'none';
            console.log('editado, publicado');
          } else {
            console.log('no publico editado');
          }
        });
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

};

export default contentMuro;
