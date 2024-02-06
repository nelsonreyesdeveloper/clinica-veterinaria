import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className="p-4 mb-4 text-center uppercase font-bold text-sm text-red-700 bg-red-100 rounded shadow-lg"> {children} </div>
    )
}

export default Alerta


