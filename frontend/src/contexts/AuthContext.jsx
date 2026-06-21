/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("usuario")

        if (savedUser) {
            return JSON.parse(savedUser)
        }

        return null
    })

    const login = (usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario))
        setUser(usuario)
    }

    const logout = () => {
        localStorage.removeItem("usuario")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
