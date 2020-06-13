import React from 'react';

import JackpotState from './context/jackpot/JackpotState';
import AlertaState from './context/alerta/AlertaState';

import Encabezado from './components/Encabezado';
import Formulario from './components/Formulario';
import Juego from './components/Juego';


const App = () => {

   return (
      <JackpotState>
         <AlertaState>
            <Encabezado />
            <Formulario />
            <Juego />
         </AlertaState>
      </JackpotState>
   );
}

export default App;
