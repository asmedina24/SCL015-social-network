// validacion de correo y contraseña
export const loginValidator = (email, pass) => {
  if (email === '' || pass === '') {
    return false;
  }
  return true;
};
// validar que la cantidad del password sea de mas de 6
export const validatorlength = (pass) => {
  if (pass.length < 6) {
    return false;
  }
  return true;
};

// validar campo vacio de text area
export const validateTxtArea = (txt) => {
  if (txt.length === 0) {
    return false;
  }
  return true;
};
