import { useState, useEffect } from 'react'
import { FaListAlt } from 'react-icons/fa'
import apiClient from '../../../api/api'

const ExamsCounter = () => {
    const [examCounter, setExamCounter] = useState(0)

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await apiClient.get('/exames?pagina=1&limite=10')
                setExamCounter(response.data.total)
            } catch (error) {
                console.error("Erro ao obter dados de estoque", error)
            }
        }
        fetchExams()
    }, [])

    return (
        <div className='bg-white shadow-sm rounded-lg border border-stone-200 p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2 text-slate-900'>
                <FaListAlt className='text-sky-700' />{examCounter}
            </h2>
            <p className='text-stone-600 mt-2'>Itens em estoque</p>
        </div>
    )
}

export default ExamsCounter
