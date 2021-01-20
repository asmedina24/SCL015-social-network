// Este es el punto de entrada de tu aplicacion
import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';

const init = () => {
  document.getElementById('root').innerHTML = menu();
  changeroute(window.location.hash);
  window.addEventListener('hashchange', () => {
    document.getElementById('root1').innerHTML = '';
    changeroute(window.location.hash);
  });
};

window.addEventListener('load', init());
