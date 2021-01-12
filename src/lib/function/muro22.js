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
                    <button class="">Me gusta</button>
                    </div>
                    <div class="commentDiv">
                      </div>`;

        // console.log(e.target.id);
      });
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
  editar: () => {

  },
};
export default contentMuro;
