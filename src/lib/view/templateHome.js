export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
<h1>BIenvenidos a nuestra pagina</h1> 
`;
  divHome.innerHTML = viewHome;
  return divHome;
};
