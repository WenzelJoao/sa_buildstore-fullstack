import React, { useEffect, useState } from "react"
import { FaBoxes } from "react-icons/fa"
import apiClient from "../../api/api"

const formatarPreco = (preco) => Number(preco).toFixed(2).replace('.', ',')

const MedicalRecordList = () => {
  const [produtos, setProdutos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await apiClient.get("/produtos")
        setProdutos(response.data.data || [])
      } catch (error) {
        console.error("Erro ao obter produtos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    buscarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.id.toString().includes(searchTerm)
    )
  })

  return (
    <section className="p-6 bg-white rounded-lg shadow-sm border border-stone-200">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">Catalogo</p>
        <h2 className="text-2xl font-bold text-slate-900">
          Materiais de construcao
        </h2>
        <p className="text-sm text-stone-600">
          Consulta rapida dos produtos cadastrados no back-end.
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label htmlFor="search" className="text-stone-700 font-medium">
          Buscar produto:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Digite nome ou codigo"
          className="w-full sm:w-1/2 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {isLoading ? (
        <p className="text-stone-600">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <article
                key={produto.id}
                className="p-4 bg-stone-50 rounded-lg border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <FaBoxes className="text-amber-600" />
                    <strong>{produto.nome}</strong>
                  </div>
                  <span className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
                    #{produto.id}
                  </span>
                </div>

                <p className="text-sm text-stone-700">
                  <strong>Preco:</strong> R$ {formatarPreco(produto.preco)}
                </p>
                <p className="text-sm text-stone-700">
                  <strong>Estoque:</strong> {produto.quantidade} unidades
                </p>
                <p className="mt-3 text-xs text-stone-500">
                  Produto sincronizado com PostgreSQL
                </p>
              </article>
            ))
          ) : (
            <p className="text-stone-600">Nenhum produto encontrado.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default MedicalRecordList
