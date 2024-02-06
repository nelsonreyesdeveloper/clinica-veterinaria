import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Paciente({ paciente, setPaciente, deletePatient}) {

    const { nombre, propietario, email, alta, sintomas, id } = paciente;

    const handleEliminar = id => {
        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: 'Esta Seguro?',
            text: "Los cambios no se podran revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePatient(id)
                Swal.fire(
                    'Borrado!',
                    'El paciente ha sido eliminado.',
                    'success'
                )
            }
        })


    }
    return (
        <div className='bg-gray-100 mb-4 rounded-sm p-4 shadow-sm shadow-gray-300'>
            <div className='mb-3'>
                <p className='font-bold uppercase'>Nombre: <span className='font-normal normal-case'>{nombre}</span></p>
            </div>
            <div className='mb-3'>
                <p className='font-bold uppercase'>Propietario: <span className='font-normal normal-case'>{propietario}</span></p>
            </div>

            <div className='mb-3'>
                <p className='font-bold uppercase'>email: <span className='font-normal normal-case'>{email}</span></p>
            </div>
            <div className='mb-3'>
                <p className='font-bold uppercase'>Fecha Alta: <span className='font-normal normal-case'>{alta}</span></p>
            </div>
            <div className='mb-3'>
                <p className='font-bold uppercase'>Sintomas: <span className='font-normal normal-case'>{sintomas}</span></p>
            </div>

            <div>
                <div className='flex flex-col gap-y-3 md:flex-row mt-5 gap-x-5'>
                    <button onClick={() => { setPaciente(paciente) }} className='px-3 py-1 bg-indigo-600  hover:bg-indigo-700 text-white rounded font-bold'>Editar</button>
                    <button onClick={() => { handleEliminar(id) }} className='px-3 py-1 bg-red-600     hover:bg-red-700 text-white rounded font-bold'>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
