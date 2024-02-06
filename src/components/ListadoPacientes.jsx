import React from 'react'
import Paciente from './Paciente'

export default function ListadoPacientes({pacientes,setPaciente,deletePatient}) {
 
  return (
    <div className=' w-full md:basis-2/3 bg-white rounded-md p-5 shadow-lg md:h-screen md:overflow-y-scroll h-full'>
     <h2 className='text-3xl uppercase text-center my-5 text-black opacity-95 font-encabezado font-bold '>{pacientes.length > 0 ? 'Seguimiento Y Listado De Pacientes' : 'No hay pacientes' }</h2>

      {pacientes.map(paciente => (
        <Paciente key={paciente.id} paciente={paciente} setPaciente={setPaciente} deletePatient={deletePatient} />
      ))}
    
    </div>
  )
}
