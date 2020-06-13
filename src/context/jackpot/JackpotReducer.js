import {
   INICIAR_JUEGO,
   SALIR_JUEGO,
   REINICIAR_JUEGO,
   ESTABLECER_IMAGENES,
   DISMINUIR_INTENTOS,
   ESTABLECER_INTENTOS
} from '../../types';


export default (state, action) => {
   switch (action.type) {

      case INICIAR_JUEGO:
         return {
            ...state,
            formulario: false,
            juego: true,
            reiniciar: false,
            imagenes: action.payload,
            intentos: state.intentosIniciales
         }

      case SALIR_JUEGO:
         return {
            ...state,
            formulario: true,
            juego: false,
            reiniciar: false
         }

      case REINICIAR_JUEGO:
         return {
            ...state,
            reiniciar: true
         }

      case ESTABLECER_IMAGENES:
         return {
            ...state,
            imagenes: action.payload
         }

      case DISMINUIR_INTENTOS:
         return {
            ...state,
            intentos: state.intentos - 1
         }

      case ESTABLECER_INTENTOS:
         return {
            ...state,
            intentos: action.payload,
            intentosIniciales: action.payload
         }

      default:
         return state;
   }
}


// El Reducer cambia UNICAMENTE los states.
