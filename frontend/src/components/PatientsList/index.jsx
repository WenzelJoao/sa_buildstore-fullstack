import { useEffect, useState } from "react"
import { FaBoxes, FaTag } from 'react-icons/fa'
import apiClient from "../../api/api"

const formatarPreco = (preco) => Number(preco).toFixed(2).replace('.', ',')

const PatientsList = () => {
    const [produtos, setProdutos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await apiClient.get('/produtos')
                setProdutos(response.data.data || [])
                setErrorMessage("")
            } catch (error) {
                console.error("Erro ao obter produtos", error)
                setErrorMessage("Nao foi possivel carregar os produtos. Verifique se o back-end esta rodando.")
            } finally {
                setIsLoading(false)
            }
        }

        buscarProdutos()
    }, [])

    const produtosFiltrados = produtos.filter((produto) =>
        [produto.nome, produto.id]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (
        <div className="bg-white shadow-sm rounded-lg border border-stone-200 p-6 mt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">Catalogo interno</p>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Produtos em destaque
                    </h2>
                    <p className="text-sm text-stone-600">
                        Produtos carregados diretamente do estoque cadastrado.
                    </p>
                </div>

                <div className="rounded bg-amber-100 px-4 py-3 text-sm text-amber-900">
                    <strong>Promocao:</strong> consulte condicoes no balcao
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-5 gap-3">
                <label htmlFor="search" className="text-stone-700 font-medium">
                    Buscar produto:
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Digite nome ou codigo"
                    className="border border-stone-300 rounded px-3 py-2 w-full sm:w-80 focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            {isLoading ? (
                <p className="text-stone-500 text-center py-6">Carregando produtos...</p>
            ) : errorMessage ? (
                <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {errorMessage}
                </p>
            ) : produtosFiltrados.length > 0 ? (
                <ul className="divide-y divide-stone-200">
                    {
                        produtosFiltrados.slice(0, 4).map((produto) => (
                            <li
                                key={produto.id}
                                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-stone-100 text-amber-700 p-3 rounded">
                                        <FaBoxes size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{produto.nome}</p>
                                        <p className="text-sm text-stone-600">Codigo #{produto.id}</p>
                                    </div>
                                </div>

                                <div className="text-sm text-stone-700 sm:text-right">
                                    <p className="font-semibold text-slate-900">
                                        R$ {formatarPreco(produto.preco)}
                                    </p>
                                    <p>{produto.quantidade} unidades em estoque</p>
                                    <p className="mt-1 inline-flex items-center gap-1 text-amber-700">
                                        <FaTag size={12} /> Disponivel para orcamento
                                    </p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <p className="text-stone-500 text-center py-6">
                    Nenhum produto encontrado
                </p>
            )}
        </div>
    )
}

export default PatientsList
