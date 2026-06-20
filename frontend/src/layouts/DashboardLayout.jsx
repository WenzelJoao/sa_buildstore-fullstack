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
            <main className="flex-1 flex flex-col">
                <header className="flex justify-between items-center border-b border-stone-200 bg-white p-4 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-900">Painel da Loja</h1>
                    {
                        user && (
                            <div className="flex items-center gap-4">
                                <span className="text-stone-700">Bem vindo, {user.email}</span>
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
                <section className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout
