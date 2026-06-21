import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUser = localStorage.getItem("usuario")

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

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
