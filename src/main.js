// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import { menu } from './lib/view/templateMenu.js';
import { changeroute } from './lib/router.js';
import { home } from './lib/view/templateHome.js';

const init = () => {
  document.getElementById('root1').appendChild(home());
  document.getElementById('root').innerHTML = menu();
  window.addEventListener('hashchange', () => {
    document.getElementById('root1').innerHTML = '';
    myFunction();
    changeroute(window.location.hash);
  });
};
window.addEventListener('load', init());
