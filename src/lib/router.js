import { menu } from './view/templateMenu.js';
import { home } from './view/templateHome.js';
import { register } from './view/templateRegister.js';
import { login } from './view/templateLogin.js';
import { muro } from './view/templateMuro.js';

const showtemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = menu();

  switch (hash) {
    case '#/':
      containerRoot.appendChild(home());
      break;
    case '#/register':
      containerRoot.appendChild(register());
      break;
    case '#/login':
      containerRoot.appendChild(login());
      break;
    case '#/muro':
      containerRoot.appendChild(muro());
      break;
    default:
      containerRoot.innerHTML = '<h2>No Existe</h2>';
  }
};

export const changeroute = (hash) => {
  if (hash === '#/') {
    return showtemplate(hash);
  } if (hash === '#/home') {
    return showtemplate(hash);
  } if (hash === '#/register') {
    return showtemplate(hash);
  } if (hash === '#/login') {
    return showtemplate(hash);
  } if (hash === '#/muro') {
    return showtemplate(hash);
  }
  return showtemplate(hash);
};
