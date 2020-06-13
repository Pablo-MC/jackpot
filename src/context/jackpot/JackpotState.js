import React, { useReducer } from 'react';

// Imágenes
import hongo_amarillo from '../../images/hongo-amarillo.png'
import hongo_rojo from '../../images/hongo-rojo.png'
import hongo_verde from '../../images/hongo-verde.png'

import JackpotContext from './JackpotContext';
import JackpotReducer from './JackpotReducer';

import {
   INICIAR_JUEGO,
   SALIR_JUEGO,
   REINICIAR_JUEGO,
   ESTABLECER_IMAGENES,
   DISMINUIR_INTENTOS,
   ESTABLECER_INTENTOS
} from '../../types';



// State Inicial
const JackpotState = (props) => {

   const opciones = [ hongo_amarillo, hongo_rojo, hongo_verde ];

   const dificultades = [
      { value: 'fac', modo: 'Fácil'},
      { value: 'nor', modo: 'Normal'},
      { value: 'dif', modo: 'Difícil'}
   ]


   const initialState = {
      formulario: true,
      juego: false,
      reiniciar: false,
      imagenes: null,
      intentos: null,
      intentosIniciales: null
   }

   // Creacion del state y el dispatch (useReducer)
   const [state, dispatch] = useReducer(JackpotReducer, initialState);


   // Funciones
   const iniciarJuego = () => {
      dispatch({
         type: INICIAR_JUEGO,
         payload: opciones

      })
   }

   const salirJuego = () => {
      dispatch({
         type: SALIR_JUEGO
      })
   }

   const reiniciarJuego = () => {
      dispatch({
         type: REINICIAR_JUEGO
      })
   }

   const setImagenes = (array) => {
      dispatch({
         type: ESTABLECER_IMAGENES,
         payload: array
      })
   }

   const disminuirIntentos = () => {
      dispatch({
         type: DISMINUIR_INTENTOS
      })
   }

   const establecerIntentos = (nro) => {
      dispatch({
         type: ESTABLECER_INTENTOS,
         payload: nro
      })
   }



   return (
      <JackpotContext.Provider
         value={{
            formulario: state.formulario,
            juego: state.juego,
            reiniciar: state.reiniciar,
            imagenes: state.imagenes,
            intentos: state.intentos,
            intentosIniciales: state.intentosIniciales,
            opciones,
            dificultades,
            iniciarJuego,
            salirJuego,
            reiniciarJuego,
            setImagenes,
            disminuirIntentos,
            establecerIntentos

         }}
      >
         {props.children}
      </JackpotContext.Provider>
   );

}

export default JackpotState;
