import { useState, useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import apiClient from '../../../api/api'

const ConsultsCounter = () => {
    const [availableCounter, setAvailableCounter] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/produtos')
                const produtosDisponiveis = (response.data.data || []).filter(
                    (produto) => Number(produto.quantidade) > 0
                )
                setAvailableCounter(produtosDisponiveis.length)
            } catch (error) {
                console.error("Erro ao obter produtos disponiveis", error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex min-h-32 w-full flex-col items-center justify-center'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <MdShoppingCart className='text-emerald-700' />{availableCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Produtos disponiveis</p>
        </div>
    )
}

export default ConsultsCounter
