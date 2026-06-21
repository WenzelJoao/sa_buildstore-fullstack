import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal'
import apiClient from '../../api/api'

const formatarPreco = (preco) => Number(preco).toFixed(2).replace('.', ',')

function ConsultationForm() {
    const [produtos, setProdutos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [quantidade, setQuantidade] = useState(1)

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await apiClient.get('/produtos')
                setProdutos(response.data.data || [])
                setErrorMessage("")
            } catch (error) {
                console.error("Erro ao buscar produtos", error)
                setErrorMessage("Nao foi possivel carregar os produtos. Verifique se o back-end esta rodando.")
            } finally {
                setIsLoading(false)
            }
        }

        buscarProdutos()
    }, [])

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

        const quantidadeCompra = Number(quantidade)

        if (!quantidade || Number.isNaN(quantidadeCompra) || quantidadeCompra <= 0) {
            toast.error("Informe uma quantidade valida para a compra.", {
                autoClose: 2500,
                hideProgressBar: true
            })
            return
        }

        if (quantidadeCompra > Number(selectedProduct.quantidade)) {
            toast.error("Quantidade maior que o estoque disponivel.", {
                autoClose: 2500,
                hideProgressBar: true
            })
            return
        }

        setIsSaving(true)

        try {
            const response = await apiClient.post(`/produtos/${selectedProduct.id}/comprar`, {
                quantidade: quantidadeCompra
            })

            const produtoAtualizado = response.data.data

            setProdutos((produtosAtuais) =>
                produtosAtuais.map((produto) =>
                    produto.id === produtoAtualizado.id ? produtoAtualizado : produto
                )
            )

            toast.success(response.data.mensagem || "Compra realizada com sucesso!", {
                autoClose: 2500,
                hideProgressBar: true
            })

            handleCloseModal()
        } catch (error) {
            console.error("Erro ao realizar compra", error)
            toast.error(error.response?.data?.mensagem || "Erro ao realizar compra", {
                autoClose: 2500,
                hideProgressBar: true
            })
        } finally {
            setIsSaving(false)
        }
    }

    const total = selectedProduct ? Number(selectedProduct.preco) * Number(quantidade || 0) : 0

    return (
        <section className='p-6 bg-white rounded-lg border border-stone-200 shadow-sm text-stone-800'>
            <div className='mb-6'>
                <p className='text-sm font-semibold uppercase tracking-wide text-amber-600'>Compras</p>
                <h2 className='text-2xl font-bold text-slate-900'>Registrar compra de produto</h2>
                <p className='text-sm text-stone-600'>
                    Selecione um material, informe a quantidade e confirme a baixa de estoque.
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

            {isLoading ? (
                <p className='text-stone-600'>Carregando produtos...</p>
            ) : errorMessage ? (
                <p className='rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
                    {errorMessage}
                </p>
            ) : (
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
                                        R$ {formatarPreco(produto.preco)}
                                    </span>
                                    <button
                                        onClick={() => handleSelectProduct(produto)}
                                        disabled={Number(produto.quantidade) <= 0}
                                        className='bg-amber-500 text-slate-950 font-semibold px-3 py-2 rounded hover:bg-amber-400 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed'
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {
                    selectedProduct && (
                        <>
                            <h2 className='text-lg font-bold mb-4 text-slate-900'>
                                Comprar {selectedProduct.nome}
                            </h2>

                            <div className='mb-4 rounded bg-stone-100 p-3 text-sm text-stone-700'>
                                <p><strong>Preco unitario:</strong> R$ {formatarPreco(selectedProduct.preco)}</p>
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
                                    Total estimado: <strong>R$ {formatarPreco(total)}</strong>
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
