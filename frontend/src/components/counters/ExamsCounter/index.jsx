import { useState, useEffect } from 'react'
import { FaListAlt } from 'react-icons/fa'
import apiClient from '../../../api/api'

const ExamsCounter = () => {
    const [stockCounter, setStockCounter] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/produtos')
                const totalEstoque = (response.data.data || []).reduce(
                    (total, produto) => total + Number(produto.quantidade || 0),
                    0
                )
                setStockCounter(totalEstoque)
            } catch (error) {
                console.error("Erro ao obter dados de estoque", error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex min-h-32 w-full flex-col items-center justify-center'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <FaListAlt className='text-sky-700' />{stockCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Itens em estoque</p>
        </div>
    )
}

export default ExamsCounter
