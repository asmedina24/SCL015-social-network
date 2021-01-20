// Este es el punto de entrada de tu aplicacion
import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';

const init = () => {
  document.getElementById('root').innerHTML = menu();
  window.location.href = '#/home';
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
