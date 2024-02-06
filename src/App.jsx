import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'

function App() {
  const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

  const [pacientes, setPacientes] = useState(pacientesLS);
  const [pacienteObjet, setPaciente] = useState({});



  /**
   * 
   * @param {PatientID} id 
   */
  const deletePatient = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  return (
    <>
      <div className='bg-gray-100 '>
        <Header />

        <div className='w-[95%]  gap-x-5 lg:max-w-7xl mx-auto flex flex-col md:flex-row pb-10 '>
          <Formulario pacientes={pacientes} setPacientes={setPacientes} pacienteObjet={pacienteObjet} setPaciente={setPaciente} />

          <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} paciente={pacienteObjet} deletePatient={deletePatient} />

        </div>

      </div>

    </>
  )
}

export default App
