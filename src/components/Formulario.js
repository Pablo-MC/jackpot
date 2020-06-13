import React, { useContext, useState } from 'react';
import shortid from 'shortid';

import JackpotContext from '../context/jackpot/JackpotContext';
import AlertaContext from '../context/alerta/AlertaContext';



const Formulario = () => {

   // Extraer states y funciones del Context de Jackpot
   const jackpotContext = useContext(JackpotContext);
   const { formulario, dificultades, iniciarJuego, establecerIntentos } = jackpotContext;

   // Extraer states y funciones del Context de Alerta
   const alertaContext = useContext(AlertaContext);
   const { alerta, mostarAlerta, ocultarAlerta } = alertaContext;


   // State para los Datos del Formulario
   const [ usuario, setUsuario ] = useState({
      nombre: '',
      edad: '',
      dificultad: ''
   });


   // Destructuring del objeto usuario
   const { nombre, edad, dificultad } = usuario;

   // Guardo los datos del Usuario en el State
   const handleChange = e => {
      setUsuario({...usuario, [e.target.name] : e.target.value});
   }


   // Verifico los datos del formulario y doy entrada al juego!
   const handleSubmit = e => {
      e.preventDefault();

      // Validar inputs no vacios
      if (nombre.trim() === '' || edad.trim() === '' || dificultad === '') {
         mostarAlerta('Todos los campos son obligatorios!', 'alerta-error soft');
         return;
      }

      // Validar edad solo numerica y positiva
      if (isNaN(edad) || edad < 0) {
         mostarAlerta('Edad incorrecta!', 'alerta-error soft');
         return;
      }

      // Ocultar Alertas
      ocultarAlerta();

      // Establecer intentos segun la dificultad
      switch (dificultad) {
         case 'fac':
            establecerIntentos(10); break;
         case 'nor':
            establecerIntentos(5); break;
         case 'dif':
            establecerIntentos(3); break;

         default:
      }

      // Iniciar juego
      iniciarJuego();

      mostarAlerta(`¡Mucha suerte ${nombre}!`, 'alerta-suerte');

      // Reiniciar formulario
      setUsuario({
         nombre: '',
         edad: '',
         dificultad: ''
      })

   }


   return (
      <>
         {formulario
         ?
            <form
               onSubmit={handleSubmit}
               className="formulario"
            >
               <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  placeholder="Nombre"
                  onChange={handleChange}
               />

               <input
                  type="text"
                  name="edad"
                  value={edad}
                  placeholder="Edad"
                  onChange={handleChange}
               />

               <select
                  name="dificultad"
                  value={dificultad}
                  onChange={handleChange}
               >
                  <option hidden> -- Dificultad -- </option>
                  {dificultades.map(dificultad => (
                     <option
                        key={shortid.generate()}
                        value={dificultad.value}
                     > {dificultad.modo} </option>
                  ))}
               </select>

               <button className="btn"> Iniciar Juego </button>

               {alerta ? <h1 className={alerta.categoria}> {alerta.msg} </h1> : null}
            </form>

         : null
         }
      </>
   );
}

export default Formulario;
