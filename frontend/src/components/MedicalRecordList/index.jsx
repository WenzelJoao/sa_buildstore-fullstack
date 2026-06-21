import React, { useState } from "react"
import { FaBoxes } from "react-icons/fa"

const produtos = [
  { id: 1, nome: "Cimento", categoria: "Basicos", preco: "35,90", quantidade: 50 },
  { id: 2, nome: "Tijolo", categoria: "Alvenaria", preco: "1,20", quantidade: 1000 },
  { id: 3, nome: "Areia", categoria: "Agregados", preco: "120,00", quantidade: 20 },
  { id: 4, nome: "Brita", categoria: "Agregados", preco: "140,00", quantidade: 15 },
  { id: 5, nome: "Tinta", categoria: "Acabamento", preco: "89,90", quantidade: 30 },
  { id: 6, nome: "Ferro", categoria: "Estrutura", preco: "45,00", quantidade: 80 },
  { id: 7, nome: "Bloco", categoria: "Alvenaria", preco: "3,50", quantidade: 500 }
]

const MedicalRecordList = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const produtosFiltrados = produtos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          Consulta rapida dos produtos que serao conectados ao estoque do sistema.
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
          placeholder="Digite nome, codigo ou categoria"
          className="w-full sm:w-1/2 p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

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
                <strong>Categoria:</strong> {produto.categoria}
              </p>
              <p className="text-sm text-stone-700">
                <strong>Preco:</strong> R$ {produto.preco}
              </p>
              <p className="text-sm text-stone-700">
                <strong>Estoque:</strong> {produto.quantidade} unidades
              </p>
            </article>
          ))
        ) : (
          <p className="text-stone-600">Nenhum produto encontrado.</p>
        )}
      </div>
    </section>
  )
}

export default MedicalRecordList
