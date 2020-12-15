export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = ` <div id='nav' ><ul>
        <a href="#/">Home</a>
               
        </ul>
        </div>  
      
       `;
  divMuro.innerHTML = ViewMuro;
  return divMuro;
};
