import { useState, useEffect } from 'react'
import { FaBoxes } from 'react-icons/fa'
import apiClient from '../../../api/api'

const PatientsCounter = () => {
    const [productCounter, setProductCounter] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/produtos')
                setProductCounter((response.data.data || []).length)
            } catch (error) {
                console.error("Erro ao obter dados dos produtos", error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex min-h-32 w-full flex-col items-center justify-center'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <FaBoxes className='text-amber-600' />{productCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Produtos</p>
        </div>
    )
}

export default PatientsCounter
