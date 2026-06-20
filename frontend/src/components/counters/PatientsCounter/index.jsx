import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaBoxes } from 'react-icons/fa'

const PatientsCounter = () => {
    const [patientCounter, setPatientCounter] = useState(0)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/patients')
                setPatientCounter(response.data.length)
            } catch (error) {
                console.error("Erro ao obter dados dos produtos", error)
            }
        }
        fetchPatients()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <FaBoxes className='text-amber-600' />{patientCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Produtos</p>
        </div>
    )
}

export default PatientsCounter
