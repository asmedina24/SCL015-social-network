// Este es el punto de entrada de tu aplicacion
import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';

// const init = () => {
//   changeroute(window.location.hash);

//   firebase.auth().onAuthStateChanged((user) => {
//     document.getElementById('root').innerHTML = menu();
//     if (user !== null) {
//       document.getElementById('root1').innerHTML = '';
//       window.addEventListener('load', changeroute(window.location.hash));
//       console.log('si esta el usuario');
//     } else {
//       window.location = ('#/home');
//     }
//   });
// };
const init = () => {
  document.getElementById('root').innerHTML = menu();
  window.addEventListener('load', changeroute(window.location.hash));

  // reconoce un cambio en el hash y le pasa ese nuevo hash a changeRouter
  if ('onhashchange' in window) {
    window.onhashchange = () => {
      console.log('en onhashchange', window.location.hash);
      document.getElementById('root1').innerHTML = '';
      changeroute(window.location.hash);
    };
  }
};

window.addEventListener('load', init());
