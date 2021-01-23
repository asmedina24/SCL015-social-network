const firestore = firebase.firestore();
const contentMuro = {
  ocultarbtn: (usuario) => {
    firestore.collection('coment').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((response) => {
        if (response.data().userid === usuario) {
          const elemento = `contenedorBotones${response.id}`;
          const evento = document.getElementById(elemento);
          evento.style.display = 'block';
        }
      });
    });
  },
  obtnerRespuest: (documento) => {
    firestore.collection('responder').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const lista = document.getElementById(`contenedor_respuesta_${documento}`);
      lista.innerHTML = '';
      querySnapshot.forEach((response) => {
        if (response.data().idComent === documento) {
          lista.innerHTML += `
          <div class = "resp-post"id="postRes_${response.id}">
          <div class= "respuesta-dtos">
          <p class="user-res">Usuario: ${response.data().nombre}</p>
            <p class="date-resp"> ${response.data().date}</p>
            </div>
            <div class="text-area-respuesta">
            <p class="coment"> ${response.data().comentarios}</p>
            </div>
            </div>`;
        }
      });
    });
  },
  btnComentario: (documento) => {
    firestore.collection('coment').onSnapshot(() => {
      const idbtResp = document.querySelectorAll(`#Comentarios_${documento}`);
      idbtResp.forEach((respComent) => {
        respComent.addEventListener('click', () => {
          const elemento = document.querySelector(`#contenedor_respuesta_${documento}`);
          if (!elemento) {
            return true;
          }
          if (elemento.style.display === 'none') {
            elemento.style.display = 'block';
          } else {
            elemento.style.display = 'none';
          }
          return true;
        });
      });
    });
  },
  btnRespoComen: (documento) => {
    firestore.collection('coment').onSnapshot(() => {
      const lista = document.querySelector('#public_muro');
      const btnResponder = `#responder_${documento.id}`;
      const responderComet = lista.querySelectorAll(btnResponder);
      responderComet.forEach((respbutton) => {
        respbutton.addEventListener('click', () => {
          console.log(documento.exists);
          if (documento.exists) {
            console.log('funciona boton');
            const nombreModal = `modalResponde_${documento.id}`;
            const modal = document.getElementById(nombreModal);
            modal.style.display = 'flex';
            const inputResp = document.getElementById(`respuesta_modal_${documento.id}`);
            inputResp.value = '';
          } else {
            console.log('llego al else');
          }
        });
      });
    });
  },
  modalRespuesta: (documento, usuario, name) => {
    const modalResponder = document.getElementById('seccion_respuesta');
    modalResponder.innerHTML += `
    <div id="modalResponde_${documento.id}" class="modal">
      <div class="contenedor_modal_">
        <div class="header_modal_">
          <button type="button" id="btn_cerrarRespuesta_${documento.id}" value="${documento.id}" class="close">X</button>
        </div>
        <div class="cuerpo_modal_">
          <form id ="form_modal">
            <input type= "text" class="modal_coment" id="respuesta_modal_${documento.id}">
          </form>
          <button class="btn-modal-resp" id="btn_responder_${documento.id}" value="${documento.id}">Responder</button>
        </div>
      </div>
    </div>`;
    contentMuro.cerrarResponder(documento);
    contentMuro.guardaRespuesta(documento, usuario, name);
  },
  cerrarResponder: (documento) => {
    firestore.collection('coment').onSnapshot(() => {
      const btnCerrar = `#btn_cerrarRespuesta_${documento.id}`;
      const cerrar = document.querySelectorAll(btnCerrar);
      cerrar.forEach((closebutton) => {
        closebutton.addEventListener('click', () => {
          if (documento.exists) {
            console.log('paso hacia el modal');
            const nomobreModal = `modalResponde_${documento.id}`;
            const modal = document.getElementById(nomobreModal);
            modal.style.display = 'none';
          } else {
            console.log('No such document!');
          }
        });
      });
    });
  },
  guardaRespuesta: (documento, usuario, name) => {
    const guardarRespuesta = `#respuesta_modal_${documento.id}`;
    firestore.collection('coment').onSnapshot(() => {
      const btnResponder = `#btn_responder_${documento.id}`;
      const publicarResponder = document.querySelectorAll(btnResponder);
      publicarResponder.forEach((publicarResp) => {
        publicarResp.addEventListener('click', () => {
          if (documento.exists) {
            const comentario = document.querySelector(guardarRespuesta).value;
            const date = new Date();
            const fecha = `${
              (`00${date.getDate()}`).slice(-2)}/${(`00${date.getMonth() + 1}`).slice(-2)}/${
              date.getFullYear()} ${
              (`00${date.getHours()}`).slice(-2)}:${
              (`00${date.getMinutes()}`).slice(-2)}:${
              (`00${date.getSeconds()}`).slice(-2)}`;
            firestore.collection('responder').add({
              comentarios: comentario,
              date: fecha,
              userid: usuario,
              nombre: name,
              meGusta: 0,
              idComent: documento.id,
            }).then(() => {
              console.log('se agrega respuesta a firebase');
            })
              .catch((error) => {
                console.error('Error adding document: ', error);
              });
            const nomobreModal = `modalResponde_${documento.id}`;
            const modal = document.getElementById(nomobreModal);
            modal.style.display = 'none';
            console.log('respuesta publicada');
          } else {
            console.log('no publico editado');
          }
        });
      });
    });
  },
  imagen: () => {
    const imgMuro = document.querySelector('#img_muro').files[0];
    const storage = firebase.storage();
    if (!imgMuro) {
      console.log('no subio foto');
    } else {
      const storageRef = storage.ref(`coment/${imgMuro.name}`);
      const uploadTask = storageRef.put(imgMuro);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const calculoPorcentaje = Math.round(progress);
        contentMuro.modalCarga(calculoPorcentaje);
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('se subio a storage');
      });
    }
  },
  modalCarga: (porcentaje) => {
    const modalCarga = document.querySelector('#seccion_carga_imagen');
    modalCarga.innerHTML = `
    <div id="modalGuardar" class="modalCarga">
      <p> Porcentaje de subida: ${porcentaje} %</p>
    </div>`;
  },
  btnAceptarCarga: () => {
    const carga = document.getElementById('btn_carga');
    carga.addEventListener('click', () => {
      console.log('cerro modal de carga');
      const modal = document.getElementById('modalGuardar');
      modal.style.display = 'none';
    });
  },
  urlImg: (usuario, nombremio) => {
    const imgMuro = document.querySelector('#img_muro').files[0];

    if (!imgMuro) {
      contentMuro.guardar(usuario, nombremio);
    } else {
      const comentario = document.querySelector('#coment_muro').value;
      const date = new Date();
      const fecha = `${
        (`00${date.getDate()}`).slice(-2)}/${(`00${date.getMonth() + 1}`).slice(-2)}/${
        date.getFullYear()} ${
        (`00${date.getHours()}`).slice(-2)}:${
        (`00${date.getMinutes()}`).slice(-2)}:${
        (`00${date.getSeconds()}`).slice(-2)}`;
      const storage = firebase.storage();
      const storageimg = storage.ref(`coment/${imgMuro.name}`);
      storageimg.getDownloadURL().then((url) => {
        console.log(url);
        firestore.collection('coment').add({
          comentarios: comentario,
          date: fecha,
          photoUrl: url,
          userid: usuario,
          nombre: nombremio,
          meGusta: 0,
          dateEditado: '',
        }).then(() => {
          console.log('se agrega comentario con foto');
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      })
        .catch((error) => {
          console.log(error);
          // Handle any errors
        });
    }

    // storageimg.putString('data_url').then((snapshot) => {
    //   const miurl = snapshot.downloadURL;
    //   console.log(`Uploaded a data_url string!${miurl}`);
    //   // add it to firestore
    // });
  },
  guardar: (usuario, name) => {
    const comentario = document.querySelector('#coment_muro').value;
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
      photoUrl: '',
      userid: usuario,
      nombre: name,
      meGusta: 0,
      dateEditado: '',
    }).then(() => {
      console.log('se agrega comentario con foto');
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
        <div class= "" >
          <div id="div_like_${documento}" style="display:${(objeto.size > 0 ? 'none' : 'block')};">
          <button id="like_${documento}" class ="btn_like" value="${documento}">Like</button>
          </div >
          <div id="div_dislike_${documento}" style="display:${(objeto.size > 0 ? 'block' : 'none')};">
            <button id="deslike_${documento}" class="btn_dislike" value="${documento}">Dislike</button>
          </div> 
        </div>`;
        contentMuro.likes(documento, usuario);
        contentMuro.dislike(documento, usuario);
      });
  },
  getCantidadLikes: (documento) => {
    firestore.collection('likes').where('docuid', '==', documento)
      .get()
      .then((objeto) => {
        document.getElementById(`contenedor_cantidad_likes_${documento}`).innerHTML = `<div>
        <p><img class="total_huella" src="https://i.imgur.com/7R2Ce8p.png">  ${objeto.size}</p></div>`;
      });
  },
  getDetailrespuesta: (documento) => {
    firestore.collection('responder').where('idComent', '==', documento)
      .get()
      .then((objeto) => {
        document.getElementById(`contenedor_boton_respuesta_${documento}`).innerHTML = `<div class= "btnmostrar" >
        <div id="div_mostrar_${documento}" class="ord_mostrar">
        <p>${objeto.size}</p>
        <button class="style_btns" id="Comentarios_${documento}" value="${documento}"><img class="img_btns" src="https://i.imgur.com/8n9cacP.png" alt=""> </button>
        </div >`;
        contentMuro.btnComentario(documento);
      });
  },
  contenidoMuro: (uid, name) => {
    firestore.collection('coment').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const lista = document.querySelector('#public_muro');
      lista.innerHTML = '';
      querySnapshot.forEach((response) => {
        lista.innerHTML += `
        <div id="postDiv-${response.id}" class="postdiv">
        <p class="user">${response.data().nombre}</p>
          <p class="date"> ${response.data().date}</p>
          <div class="text-area">
          <img class="img_coment" src="${response.data().photoUrl}" alt="">
          <div class= "contendorPost">
          <p class="coment"> ${response.data().comentarios}</p>
          </div>
          <p class="date_edit"> ${response.data().dateEditado}</p>
          </div>
          <div class= "btnContenMuro">
          <div class="contenedor_btns">
              <div class="div_likes">
                  <div id="contenedor_botnes_like_${response.id}"></div>
                  <div id="contenedor_cantidad_likes_${response.id}" class="cantidadlikes"></div>
              </div> 
              <div class="div_ocultar">
                  <div id="contenedorBotones${response.id}" class="ocultarbotones">
                  <button  class="style_btns" id="delete_${response.id}" value="${response.id}"><img class="img_btns2" src="https://i.imgur.com/0vvMvaZ.png" alt=""></button> 
                  <button class="style_btns" id="btn_edit_${response.id}" value="${response.id}"><img class="img_btns2" src="https://i.imgur.com/paRdDE7.png" alt=""></button>
                  </div>
              </div>
          </div> 
          <div id="contenedor_boton_respuesta_${response.id}"></div>
          <button class="style_btns" id="responder_${response.id}" value="${response.id}"><img class="img_btns" src="https://i.imgur.com/ne7Kzgc.png" alt=""></button>
          <div id="contenedor_respuesta_${response.id}" class="ocultar"></div>
          </div>
         <br>`;
        contentMuro.ocultarbtn(uid);
        contentMuro.modal(response, uid, name);
        contentMuro.modalBorrar(response, uid);
        contentMuro.btnEditar(response, uid);
        contentMuro.btnBorrar(response, uid);
        contentMuro.btnRespoComen(response);
        contentMuro.modalRespuesta(response, uid, name);
        contentMuro.obtnerRespuest(response.id);
        contentMuro.getDetailLike(response.id, uid);
        contentMuro.getCantidadLikes(response.id);
        contentMuro.getDetailrespuesta(response.id);
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
        deletebutton.addEventListener('click', () => {
          if (documento.exists) {
            if (documento.data().userid !== usuario) {
              alert('no es tu comentario');
            } else {
              console.log('paso hacia el modal de borrar');
              const nombreModal = `modal_borrar_${documento.id}`;
              const modal = document.getElementById(nombreModal);
              modal.style.display = 'flex';
            }
          } else {
            console.log('no llego al else');
          }
        });
      });
    });
  },
  borrar: (value) => {
    firestore.collection('coment').doc(value).delete()
      .then(() => {
        console.log('se borro comentario');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  },
  borrarResp: (documento) => {
    firestore.collection('responder').where('idComent', '==', documento)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('se borraron respuestas con comentarios');
          }).catch((error) => {
            console.error('Error removing document: ', error);
          });
        });
      });
  },
  borrarLike: (documento) => {
    firestore.collection('likes').where('docuid', '==', documento)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('likes borrado con el documento');
          }).catch((error) => {
            console.error('Error removing document: ', error);
          });
        });
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
        <div class = "modal-btn-borrar">
        <button id="acept_borrar_${documento.id}" class="style_btns_aceptar" value="${documento.id}"></button>
        
      
        <button type="button" id="cance_borrar_${documento.id}" class="style_btns_borrar" value="${documento.id}"><img class="bt-acep-borrar" src="https://i.imgur.com/l0gJx5N.png" alt=""></button>
      
        </div>
        </div>
      </div>
    </div>`;
    contentMuro.btnBorrar(usuario);
    contentMuro.aceptarBorrar(documento);
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
            contentMuro.borrarResp(documento.id);
            contentMuro.borrarLike(documento.id);
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
            console.log('No se cerro el modal');
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
            document.getElementById('seccion_modal').innerHTML = '';
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
        console.log('este es el doc.id', doc.id);
        console.log('este es el documento', documento.id);
        console.log('doc.exist', doc.exists);
        console.log('este es el e.target', e.target.value);
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
              console.log('error al actualizar likes');
            });
        } else {
          console.log('probando no deberias salir');
          console.log(doc);
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
