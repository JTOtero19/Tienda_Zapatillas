export default class Tabs {
  // Para ejecutar este codigo hay que hacer una instancia de la clase.
  constructor(idElemento){
    // Queremos tener acceso a los tabs
    // Queremos definir una propiedad, se usa this, aqui guardaremos el elemento completo
    this.tabs = document.getElementById(idElemento);
    // Aqui guardaremos el menu de navegacion
    this.nav = this.tabs.querySelector('.tabs');

    //Agregar eventlistener a todo el menu de navegacion
    this.nav.addEventListener('click', (e) => {

      // De esta forma lo transformamos en un array que contiene las clases
      if ([...e.target.classList].includes('tabs__button')){

        // Obetenmos la tab que queremos mostrar.
        const tab = e.target.dataset.tab;

        // Queremos quitarle la calse activa de alguna de las otras tabs que la tengan
        if (this.tabs.querySelector('.tab--active')){
          this.tabs.querySelector('.tab--active').classList.remove('tab--active');
        };

        // Quitamos la clase active del boton
        if (this.tabs.querySelector('.tabs__button--active')){
          this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
        };

        // Agregamos la clase activa al tab
        this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

        // Agregamos la clase activa al boton
        e.target.classList.add('tabs__button--active');
      }
    });
  }
};
