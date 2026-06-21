import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal'

const produtos = [
    { id: 1, nome: "Cimento", preco: 35.90, quantidade: 50 },
    { id: 2, nome: "Tijolo", preco: 1.20, quantidade: 1000 },
    { id: 3, nome: "Areia", preco: 120.00, quantidade: 20 },
    { id: 4, nome: "Brita", preco: 140.00, quantidade: 15 },
    { id: 5, nome: "Tinta", preco: 89.90, quantidade: 30 },
    { id: 6, nome: "Ferro", preco: 45.00, quantidade: 80 },
    { id: 7, nome: "Bloco", preco: 3.50, quantidade: 500 }
]

function ConsultationForm() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [quantidade, setQuantidade] = useState(1)

    const filteredProducts = produtos.filter(
        (produto) =>
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.id.toString().includes(searchTerm)
    )

    const handleSelectProduct = (produto) => {
        setSelectedProduct(produto)
        setQuantidade(1)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedProduct) return

        setIsSaving(true)

        setTimeout(() => {
            toast.success("Compra preparada. A baixa real de estoque entra na etapa de integracao.", {
                autoClose: 2500,
                hideProgressBar: true
            })
            setIsSaving(false)
            handleCloseModal()
        }, 500)
    }

    const total = selectedProduct ? selectedProduct.preco * Number(quantidade || 0) : 0

    return (
        <section className='p-6 bg-white rounded-lg border border-stone-200 shadow-sm text-stone-800'>
            <div className='mb-6'>
                <p className='text-sm font-semibold uppercase tracking-wide text-amber-600'>Compras</p>
                <h2 className='text-2xl font-bold text-slate-900'>Registrar compra de produto</h2>
                <p className='text-sm text-stone-600'>
                    Fluxo visual para selecionar material e preparar a baixa de estoque.
                </p>
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-semibold mb-2'>
                    Buscar produto
                </label>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Digite o nome ou codigo do produto'
                    className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                />
            </div>

            <ul className='space-y-3'>
                {
                    filteredProducts.map((produto) => (
                        <li
                            key={produto.id}
                            className='p-4 border border-stone-200 rounded-lg shadow-sm flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center hover:bg-stone-50 transition'
                        >
                            <div>
                                <p className='text-sm text-stone-600'>
                                    <strong>Codigo:</strong> {produto.id}
                                </p>
                                <p className='font-semibold text-slate-900'>
                                    {produto.nome}
                                </p>

                                <p className='text-sm text-stone-600'>
                                    Estoque atual: {produto.quantidade} unidades
                                </p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <span className='font-semibold text-slate-900'>
                                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                                </span>
                                <button
                                    onClick={() => handleSelectProduct(produto)}
                                    className='bg-amber-500 text-slate-950 font-semibold px-3 py-2 rounded hover:bg-amber-400 cursor-pointer'
                                >
                                    Comprar
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {
                    selectedProduct && (
                        <>
                            <h2 className='text-lg font-bold mb-4 text-slate-900'>
                                Comprar {selectedProduct.nome}
                            </h2>

                            <div className='mb-4 rounded bg-stone-100 p-3 text-sm text-stone-700'>
                                <p><strong>Preco unitario:</strong> R$ {selectedProduct.preco.toFixed(2).replace('.', ',')}</p>
                                <p><strong>Estoque disponivel:</strong> {selectedProduct.quantidade} unidades</p>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <label htmlFor='quantidade' className='block text-sm font-medium mb-1'>
                                        Quantidade
                                    </label>

                                    <input
                                        type='number'
                                        name='quantidade'
                                        id='quantidade'
                                        min='1'
                                        max={selectedProduct.quantidade}
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                        required
                                        className='w-full border border-stone-300 p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none'
                                    />
                                </div>

                                <div className='rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900'>
                                    Total estimado: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
                                </div>

                                <div className='flex justify-end gap-3 pt-4'>
                                    <button
                                        type='button'
                                        onClick={handleCloseModal}
                                        className='px-4 py-2 bg-stone-200 text-stone-700 rounded hover:bg-stone-300 transition'
                                    >
                                        Fechar
                                    </button>

                                    <button
                                        type='submit'
                                        disabled={isSaving}
                                        className='px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 disabled:opacity-50 transition'
                                    >
                                        {isSaving ? "Salvando..." : "Confirmar"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )
                }
            </Modal>
        </section>
    )
}

export default ConsultationForm
