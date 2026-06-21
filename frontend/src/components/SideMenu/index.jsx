import { useNavigate, NavLink } from 'react-router'
import {
    MdDashboard,
    MdExitToApp,
    MdMenu,
    MdClose,
    MdShoppingCart
} from 'react-icons/md'

import {
    FaUserPlus,
    FaListAlt,
    FaBoxes
} from 'react-icons/fa'

import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const SideMenu = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    const linkClass = ({ isActive }) =>
        `flex items-center justify-center gap-2 rounded px-2 py-2 hover:bg-slate-800 hover:text-amber-300 md:justify-start ${isActive ? 'bg-slate-800 text-amber-300' : 'text-white'}`

    return (
        <aside
            className={`h-screen shrink-0 bg-slate-900 text-white flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-20 md:w-64'
                }`}
        >
            <div className='p-4 flex items-center justify-between border-b border-slate-700'>
                {
                    !isCollapsed && (
                        <h1 className='hidden text-lg font-bold text-amber-400 md:block'>BuildStore</h1>
                    )
                }
                <button
                    onClick={toggleMenu}
                    className='mx-auto text-white hover:text-amber-300 focus:outline-none md:mx-0'
                >
                    {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
                </button>
            </div>

            <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
                <ul className='space-y-3'>
                    <li>
                        <NavLink to="/dashboard" className={linkClass}>
                            <MdDashboard size={20} />
                            {!isCollapsed && <span className='hidden md:inline'>Inicio</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/prontuarios" className={linkClass}>
                            <FaBoxes size={20} />
                            {!isCollapsed && <span className='hidden md:inline'>Catalogo</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pacientes" className={linkClass}>
                            <FaUserPlus size={20} />
                            {!isCollapsed && <span className='hidden md:inline'>Novo Produto</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/consultas" className={linkClass}>
                            <MdShoppingCart size={20} />
                            {!isCollapsed && <span className='hidden md:inline'>Compras</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/exames" className={linkClass}>
                            <FaListAlt size={20} />
                            {!isCollapsed && <span className='hidden md:inline'>Usuarios</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className='p-4 border-t border-slate-700'>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 text-red-300 hover:text-red-500 w-full cursor-pointer'
                >
                    <MdExitToApp size={20} />
                    {!isCollapsed && <span className='hidden md:inline'>Sair</span>}
                </button>
            </div>
        </aside >
    )
}

export default SideMenu
