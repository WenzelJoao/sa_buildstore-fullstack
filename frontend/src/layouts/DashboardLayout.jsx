import { Outlet } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import SideMenu from "../components/SideMenu"


const DashboardLayout = () => {
    const { user, logout } = useAuth()

    return (
        <div className="flex min-h-screen bg-stone-100">
            {/* barra lateral - menu */}

            <SideMenu />

            {/* Conteúdo principal */}
            <main className="flex-1 flex min-w-0 flex-col">
                <header className="flex flex-col gap-3 border-b border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-xl font-bold text-slate-900">Painel da Loja</h1>
                    {
                        user && (
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="max-w-full truncate text-sm text-stone-700 sm:text-base">Bem vindo, {user.nome || user.email}</span>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Sair

                                </button>

                            </div>
                        )
                    }
                </header>

                {/* Páginas internas do dashboard */}
                <section className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout
