import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

import { useAuth } from '../../contexts/AuthContext'
import Modal from '../Modal'
import RegisterUser from '../RegisterUser'
import apiClient from '../../api/api'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()
    const { login, user } = useAuth()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await apiClient.post('/login', {
                email, senha: password
            })

            if (response.data.length === 0) {
                toast.error('Funcionario nao encontrado. Verifique email e senha.', {
                    autoClose: 3000,
                    hideProgressBar: true
                })
                return
            }

            localStorage.setItem("accessToken", response?.data?.accessToken)
            localStorage.setItem("refreshToken", response?.data?.refreshToken)

            login(email)

            toast.success('Login realizado com sucesso!', {
                autoClose: 2000
            })

            setTimeout(() => navigate('/dashboard', 2000))

        } catch (error) {
            console.error('Erro ao verificar funcionario', error)
            toast.error('Erro ao conectar com o servidor', {
                autoClose: 3000
            })
        }
    }

    return (
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-stone-200'>
            <div className='mb-6 text-center'>
                <p className='text-sm font-semibold uppercase tracking-wide text-amber-600'>Acesso interno</p>
                <h2 className='text-2xl font-bold text-slate-900'>Entrar na loja</h2>
                <p className='mt-1 text-sm text-stone-600'>Use seu email e senha de funcionario.</p>
            </div>

            <form onSubmit={handleLogin} className='space-y-4'>
                <fieldset>
                    <label htmlFor='email' className='block text-sm font-medium mb-1 text-stone-700'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor='password' className='block text-sm font-medium mb-1 text-stone-700'>Senha</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                </fieldset>

                <button
                    type='submit'
                    className='w-full bg-amber-500 text-slate-950 font-semibold p-2 rounded hover:bg-amber-400 transition-colors'>
                    Entrar
                </button>
            </form>

            <div className='flex justify-between mt-4 text-sm'>
                <button onClick={() => toast.info('Funcionalidade em desenvolvimento')} className='text-slate-700 hover:text-amber-700 hover:underline cursor-pointer'>
                    Esqueceu sua senha?
                </button>

                <button onClick={() => setIsModalOpen(true)} className='text-slate-700 hover:text-amber-700 hover:underline cursor-pointer'>
                    Criar funcionario
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterUser />
            </Modal>
        </div>
    )
}

export default LoginForm
