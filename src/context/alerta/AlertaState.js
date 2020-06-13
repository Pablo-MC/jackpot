import React, { useReducer } from 'react';

import AlertaContext from './AlertaContext';
import AlertaReducer from './AlertaReducer';

import {
   MOSTRAR_ALERTA,
   OCULTAR_ALERTA
} from '../../types';



const AlertaState = (props) => {

   const initialState = {
      alerta: null
   }


   // Creacion del state y el dispatch (useReducer)
   const [state, dispatch] = useReducer(AlertaReducer, initialState);


   // Funciones
   const mostarAlerta = (msg, categoria) => {
      dispatch({
         type: MOSTRAR_ALERTA,
         payload: {
            msg,
            categoria
         }
      })

      // Luego de 5 segundos oculto la Alerta
      setTimeout(function () {
         dispatch({
            type: OCULTAR_ALERTA
         })
      }, 5000);
   }

   const ocultarAlerta = () => {
      dispatch({
         type: OCULTAR_ALERTA
      })
   }



   return (
      <AlertaContext.Provider
         value={{
            alerta: state.alerta,
            mostarAlerta,
            ocultarAlerta
         }}
      >
         {props.children}
      </AlertaContext.Provider>
   );
}

export default AlertaState;
