import { menu } from './view/templateMenu.js';
import { home } from './view/templateHome.js';
import { register } from './view/templateRegister.js';
import { muro } from './view/templateMuro.js';

const showtemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  const containerRoot2 = document.getElementById('root1');
  containerRoot.innerHTML = menu();
  switch (hash) {
    case '':
      console.log('case vacio');
      containerRoot2.appendChild(home());
      break;
    case '#/home':
      containerRoot2.appendChild(home());
      break;
    case '#/register':
      containerRoot2.appendChild(register());
      break;
    case '#/muro':
      containerRoot2.appendChild(muro());

      break;
    default:
      containerRoot2.innerHTML = '<h2>La pagina que busca no existe</h2>';
  }
};

export const changeroute = (hash) => {
  if (hash === '') {
    console.log('hash es vacio');
    return showtemplate(hash);
  }
  if (hash === '#/home') {
    return showtemplate(hash);
  } if (hash === '#/register') {
    return showtemplate(hash);
  } if (hash === '#/muro') {
    return showtemplate(hash);
  }
  return showtemplate(hash);
};
