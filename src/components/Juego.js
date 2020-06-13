import React, { useContext } from 'react';
import shortid from 'shortid';

import JackpotContext from '../context/jackpot/JackpotContext';
import AlertaContext from '../context/alerta/AlertaContext';


const Juego = () => {

   const jackpotContext = useContext(JackpotContext);
   const { juego, reiniciar, imagenes, opciones, intentos, disminuirIntentos , setImagenes, iniciarJuego, salirJuego, reiniciarJuego } = jackpotContext;

   const alertaContext = useContext(AlertaContext);
   const { alerta, mostarAlerta, ocultarAlerta } = alertaContext;



   function arrayAleatorio (array) {
      var aleatorio = [];
      for (var i = 0; i < array.length; i++) {
         // Asignar elmento aleatorio del array
         aleatorio[i] = array[Math.floor(Math.random() * array.length)];
      }
      return aleatorio;
   }

   function elementosIguales (array) {
      var iguales = false;
      for (var i = 0; i < array.length - 1; i++) {
         if (array[i] === array[i+1]) {
            iguales = true
         } else {
            iguales = false; break;
         }
      }
      return iguales;
   }



   const jugar = () => {

      ocultarAlerta();

      // Lazo al azar las imagenes
      const azar = arrayAleatorio(opciones);

      // Reestablecer el State de Imagenes
      setImagenes(azar);

      // Decremento cantidad de intentos
      disminuirIntentos();

      // Si hay ganador muestro cartel de ganador y opciones de reinicio de juego.
      if (elementosIguales(azar)) {
         switch (azar[0]) {
            case '/static/media/hongo-verde.16f15c24.png':
               mostarAlerta(<> &#9819; ¡G A N A S T E! &#9819; </>, 'alerta-verde soft'); break;
            case '/static/media/hongo-rojo.bd691655.png':
               mostarAlerta(<> &#9819; ¡G A N A S T E! &#9819; </>, 'alerta-rojo soft'); break;
            case '/static/media/hongo-amarillo.e530c02f.png':
               mostarAlerta(<> &#9819; ¡G A N A S T E! &#9819; </>, 'alerta-amarillo soft'); break;

            default:
         }
         reiniciarJuego();
      }

      if (intentos === 1 && !elementosIguales(azar)) {
         mostarAlerta(<> &#x1f622; ¡P E R D I S T E! &#x1f622; </>, 'alerta-rojo soft');
         reiniciarJuego();
      }
   }


   const reiniciarPartida = () => {
      ocultarAlerta();
      iniciarJuego();
   }

   const salir = () => {
      ocultarAlerta();
      salirJuego()
   }



   return (
      <>
         {juego
         ?
            <div className="juego">

               {imagenes.map(imagen => (
                  <img className="img" key={shortid.generate()} src={imagen} alt={imagen} />
               ))}

               {reiniciar
               ?
                  <>
                     <button className="btn btn-reinciar" onClick={() => reiniciarPartida()}> Volver a Jugar! </button>
                     <button className="btn btn-salir" onClick={() => salir()}> Salir </button>
                  </>

               :
                  <>
                     <button className="btn" onClick={() => jugar()}> Suerte! </button>
                     <p className="intentos"> &#x1f5e6; {intentos} &#x1f5e7; </p>
                  </>
               }

               {alerta ? <h1 className={alerta.categoria}> {alerta.msg} </h1> : null}

            </div>

         : null
         }
      </>
   );
}

export default Juego;
