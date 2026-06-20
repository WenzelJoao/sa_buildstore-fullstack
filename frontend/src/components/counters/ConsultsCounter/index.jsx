import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdShoppingCart } from 'react-icons/md'

const ConsultsCounter = () => {
    const [consultCounter, setConsultCounter] = useState(0)

    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const response = await axios.get('http://localhost:3000/consults')
                setConsultCounter(response.data.length)
            } catch (error) {
                console.error("Erro ao obter dados das compras", error)
            }
        }
        fetchConsults()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <MdShoppingCart className='text-emerald-700' />{consultCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Compras</p>
        </div>
    )
}

export default ConsultsCounter
