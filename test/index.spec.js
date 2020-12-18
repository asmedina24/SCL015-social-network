// importamos la funcion que vamos a testear
// import { myFunction, login } from '../src/lib/index';
import { loginValidator, validatorlength, validateTxtArea } from '../src/lib/view/validador.js';

describe('validationLogin', () => {
  it('debería ser una función', () => {
    expect(typeof loginValidator).toBe('function');
  });
  it('debería retornar false  campo vacio', () => {
    expect(loginValidator('medina@gmail.com', '')).toBe(false);
  });
  it('debería retornar true campo lleno', () => {
    expect(loginValidator('medina@gmail.com', '123456')).toBe(true);
  });
});

describe('validatorlength', () => {
  it('debería ser una función', () => {
    expect(typeof validatorlength).toBe('function');
  });
  it('Deberia retornar false para contraseña menor a 6 caracteres', () => {
    expect(validatorlength('12345')).toBe(false);
  });
  it('Deberia retornar true para contraseña de 6 o mas caracteres', () => {
    expect(validatorlength('12345A')).toBe(true);
  });
});

describe('validateTxtArea', () => {
  test('debería ser una función', () => {
    expect(typeof validateTxtArea).toBe('function');
  });
  test('Deberia retornar false para password menor a 6 caracteres', () => {
    expect(validateTxtArea('')).toBe(false);
  });
  test('Deberia retornar true para password de 6 o mas caracteres', () => {
    expect(validateTxtArea('Nuevo Post')).toBe(true);
  });
});
