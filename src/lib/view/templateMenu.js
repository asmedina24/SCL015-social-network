export const menu = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.id === true) {
        const ViewMenu = ` 
        <nav class="navegacion">
        <img class="img_infopet" src="./img/group_2.png">
        <div id='nav' class="nav">   
          <ul> 
            <a href="#/home">Home</a>
            <a href="#/register">Registro</a>
          </ul> 
        </div>
        <div id='nav_login'>   
        <ul> 
          <a href="#/home">Home</a>
          <a href="#/register">Registro</a>
          </ul> 
         
          </div>
        </nav>
          
           `;
        const nav = document.getElementById('nav');
        nav.style.display = 'none';
        return ViewMenu;
      } else {
        alert('verifica tu correo');
      }
    }
  });
  
};
