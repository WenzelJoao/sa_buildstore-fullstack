import { useState } from "react"
import { FaBoxes, FaTag } from 'react-icons/fa'

const produtosDestaque = [
    { id: 1, nome: "Cimento CP II", categoria: "Basicos", preco: "35,90", quantidade: 50 },
    { id: 2, nome: "Tijolo Baiano", categoria: "Alvenaria", preco: "1,20", quantidade: 1000 },
    { id: 3, nome: "Tinta Acrilica", categoria: "Acabamento", preco: "89,90", quantidade: 30 },
    { id: 4, nome: "Ferro 3/8", categoria: "Estrutura", preco: "45,00", quantidade: 80 }
]

const PatientsList = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const produtosFiltrados = produtosDestaque.filter((produto) =>
        [produto.nome, produto.categoria]
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
                        Materiais mais consultados pela equipe da loja.
                    </p>
                </div>

                <div className="rounded bg-amber-100 px-4 py-3 text-sm text-amber-900">
                    <strong>Promocao:</strong> kits de pintura com desconto no balcao
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
                    placeholder="Digite nome ou categoria"
                    className="border border-stone-300 rounded px-3 py-2 w-full sm:w-80 focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            {
                produtosFiltrados.length > 0 ? (
                    <ul className="divide-y divide-stone-200">
                        {
                            produtosFiltrados.map((produto) => (
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
                                            <p className="text-sm text-stone-600">{produto.categoria}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm text-stone-700 sm:text-right">
                                        <p className="font-semibold text-slate-900">
                                            R$ {produto.preco}
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
                )
            }
        </div>
    )
}

export default PatientsList
