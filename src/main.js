// Este es el punto de entrada de tu aplicacion
import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';
import contentLogin from './lib/function/login.js';

const init = () => {
  document.getElementById('root').innerHTML = menu();
  changeroute(window.location.hash);
  window.addEventListener('hashchange', () => {
    document.getElementById('root1').innerHTML = '';
    changeroute(window.location.hash);
    contentLogin.estadoLogin();
  });
};
window.addEventListener('load', init());
