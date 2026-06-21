import React, { useState } from 'react'
import { toast } from 'react-toastify'

const estadoInicial = {
    nome: "",
    categoria: "",
    preco: "",
    quantidade: "",
    destaque: "",
    observacoes: ""
}

function RegisterFormPatient() {
    const [formData, setFormData] = useState(estadoInicial)
    const [isSaving, setIsSaving] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)

        setTimeout(() => {
            toast.success("Produto preparado para cadastro. A integracao com o estoque entra na proxima etapa.", {
                autoClose: 2500,
                hideProgressBar: true
            })
            setFormData(estadoInicial)
            setIsSaving(false)
        }, 500)
    }

    return (
        <section className='bg-white rounded-lg border border-stone-200 shadow-sm p-6'>
            <div className='mb-6'>
                <p className='text-sm font-semibold uppercase tracking-wide text-amber-600'>Produtos</p>
                <h2 className='text-2xl font-bold text-slate-900'>Cadastrar novo produto</h2>
                <p className='text-sm text-stone-600'>
                    Formulario alinhado ao cadastro simples de produtos do back-end.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className='space-y-6 text-stone-800'
                autoComplete='off'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <fieldset>
                        <label htmlFor='nome' className='block text-sm font-medium mb-1'>Nome do produto</label>
                        <input
                            type='text'
                            name='nome'
                            id='nome'
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            placeholder='Ex: Cimento'
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='categoria' className='block text-sm font-medium mb-1'>Categoria</label>
                        <select
                            name='categoria'
                            id='categoria'
                            value={formData.categoria}
                            onChange={handleInputChange}
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        >
                            <option value="">Selecione</option>
                            <option value="Basicos">Basicos</option>
                            <option value="Alvenaria">Alvenaria</option>
                            <option value="Agregados">Agregados</option>
                            <option value="Acabamento">Acabamento</option>
                            <option value="Estrutura">Estrutura</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <label htmlFor='preco' className='block text-sm font-medium mb-1'>Preco</label>
                        <input
                            type='number'
                            name='preco'
                            id='preco'
                            value={formData.preco}
                            onChange={handleInputChange}
                            min='0'
                            step='0.01'
                            required
                            placeholder='35.90'
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='quantidade' className='block text-sm font-medium mb-1'>Quantidade em estoque</label>
                        <input
                            type='number'
                            name='quantidade'
                            id='quantidade'
                            value={formData.quantidade}
                            onChange={handleInputChange}
                            min='0'
                            required
                            placeholder='50'
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='destaque' className='block text-sm font-medium mb-1'>Destaque comercial</label>
                        <input
                            type='text'
                            name='destaque'
                            id='destaque'
                            value={formData.destaque}
                            onChange={handleInputChange}
                            placeholder='Ex: Produto em promocao'
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor='observacoes' className='block text-sm font-medium mb-1'>Observacoes internas</label>
                        <input
                            type='text'
                            name='observacoes'
                            id='observacoes'
                            value={formData.observacoes}
                            onChange={handleInputChange}
                            placeholder='Ex: Verificar entrega com fornecedor'
                            className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                        />
                    </fieldset>
                </div>

                <div className='flex justify-end gap-3 pt-4'>
                    <button
                        type='submit'
                        disabled={isSaving}
                        className='px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 disabled:opacity-50'
                    >
                        {isSaving ? "Salvando..." : "Salvar produto"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default RegisterFormPatient
