import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';

const init = () => {
  document.getElementById('root').innerHTML = menu();
  window.addEventListener('load', changeroute(window.location.hash)); // cuando cargue pag, verifica donde esta y cargue el change
  // reconoce un cambio en el hash y le pasa ese nuevo hash a changeRouter
  if ('onhashchange' in window) { // detectar un cambio en la pag
    window.onhashchange = () => {
      // console.log('en onhashchange', window.location.hash);
      document.getElementById('root1').innerHTML = '';
      changeroute(window.location.hash);
    };
  }
};

window.addEventListener('load', init()); // cuando cargue ñla pag, ejecuta función.
