import { useState, useEffect } from 'react'
import Alerta from './Alerta';
import { uid } from 'uid';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Formulario({ pacientes, setPacientes, pacienteObjet, setPaciente }) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);
    const [filtro, setFiltro] = useState(false);
    

    useEffect(() => {
        if (Object.keys(pacienteObjet).length > 0) {
            setFiltro(true);
            setNombre(pacienteObjet.nombre);
            setPropietario(pacienteObjet.propietario);
            setEmail(pacienteObjet.email);
            setAlta(pacienteObjet.alta);
            setSintomas(pacienteObjet.sintomas);
            return
        }
        setFiltro(false);
    }, [pacienteObjet])

    useEffect(() => {
        /* ENVIAR LOS PACIENTES AL LOCALSTORAGE */
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    },[pacientes])

    const limpiarFormulario = () => {
        setPaciente({});
        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if ([nombre, propietario, email, alta, sintomas].includes('')) {
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 10000)

            return;
        }

        setError(false);

        const nuevoPaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas,
        }

        const MySwal = withReactContent(Swal)
        if (pacienteObjet.id) {
            nuevoPaciente.id = pacienteObjet.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === pacienteObjet.id ? nuevoPaciente : pacienteState);
            setPacientes(pacientesActualizados)
            limpiarFormulario();

            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Paciente Actualizado Correctamente'
            })
            return;
        }
        else {
            nuevoPaciente.id = uid();
            setPacientes([...pacientes, nuevoPaciente]);

            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Paciente Agregado Correctamente'
            })

            limpiarFormulario();
        }


    }

    return (
        <>
            <div className='p-5 shadow-lg shadow-indigo-100 w-full md:basis-1/3 bg-white rounded-md '>
                <h1 className='text-3xl uppercase text-center my-5 text-black opacity-95 font-encabezado font-bold'>Registro</h1>

                <div className="form">
                    {error && <Alerta>Todos los campos son obligatorios</Alerta>}
                    <form onSubmit={handleSubmit}>
                        <legend className='text-center  font-encabezado text-xl uppercase font-semibold underline underline-offset-4 decoration-4 decoration-indigo-700 '>{" "}Ingresa los datos{"  "}</legend>
                        {
                            filtro && (<div className='my-2 flex justify-end'>
                                <button onClick={(e) => { e.preventDefault(); limpiarFormulario() }} className='text-gray-500 underline decoration-gray-600 underline-offset-4 decoration-4 cursor-pointer'>Limpiar Formulario*</button>
                            </div>)
                        }
                        <div className='my-4'>
                            <label className='uppercase font-bold block mb-1' htmlFor="nombre">Nombre Mascota</label>
                            <input onChange={(e) => setNombre(e.target.value)} value={nombre} className='w-full placeholder-gray-700 placeholder-opacity-30 placeholder:uppercase  p-2 rounded border border-gray-400 focus:outline-none border-opacity-50' type="text" placeholder='Ingresa el nombre del paciente' name='nombre' id='nombre' />
                        </div>
                        <div className='my-4'>
                            <label className='uppercase font-bold block mb-1' htmlFor="propietario">Nombre Propietario</label>
                            <input onChange={(e) => setPropietario(e.target.value)} value={propietario} className='w-full placeholder-gray-700 placeholder-opacity-30 placeholder:uppercase  p-2 rounded border border-gray-400 focus:outline-none border-opacity-50' type="text" placeholder='Ingresa el nombre del Propietario' name='propietario' id='propietario' />
                        </div>

                        <div className='my-4'>
                            <label className='uppercase font-bold block mb-1' htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full placeholder-gray-700 placeholder-opacity-30 placeholder:uppercase  p-2 rounded border border-gray-400 focus:outline-none border-opacity-50' type="email" placeholder='Ingresa el email del propietario' name='email' id='email' />
                        </div>

                        <div className='my-4'>
                            <label className='uppercase font-bold block mb-1' htmlFor="alta">Alta</label>
                            <input onChange={(e) => setAlta(e.target.value)} value={alta} className='w-full placeholder-gray-700 placeholder-opacity-30 placeholder:uppercase  p-2 rounded border border-gray-400 focus:outline-none border-opacity-50' type="date" name='alta' id='alta' />
                        </div>

                        <div className='my-4'>
                            <label className='uppercase font-bold block mb-1' htmlFor="alta">sintomas</label>
                            <textarea onChange={(e) => setSintomas(e.target.value)} value={sintomas} className='w-full h-24 placeholder-gray-700 placeholder-opacity-30 placeholder:uppercase  p-2 rounded border border-gray-400 focus:outline-none border-opacity-50' placeholder='Ingresa los sintomas' name='sintomas' id='sintomas' />

                        </div>

                        <div>
                            <button type='submit' className='bg-indigo-700 w-full p-2 rounded uppercase text-white font-bold'>{pacienteObjet.id ? 'ACTUALIZAR' : 'AGREGAR'}</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
