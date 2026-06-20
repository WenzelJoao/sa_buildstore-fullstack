import React, { useState } from 'react'
import { toast } from 'react-toastify'
import apiClient from '../../api/api'

const RegisterUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const isPasswordValid = () => password.length >= 8 && password === confirmPassword

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await apiClient.post('/cadastro', {
                email, senha: password
            })

            setIsSaving(false)
            resetForm()
            toast.success('Funcionario criado com sucesso!', {
                autoClose: 2000,
                hideProgressBar: true
            })
        } catch (error) {
            console.error('Erro ao criar funcionario', error)
            toast.error('Erro ao criar funcionario!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-white rounded-lg'>
            <h2 className='text-2xl font-bold mb-2 text-center text-slate-900'>Criar Funcionario</h2>
            <p className='mb-6 text-center text-sm text-stone-600'>Cadastro simples para acesso interno.</p>

            <form onSubmit={handleSubmit} className='space-y-4'>
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
                        minLength={8}
                        className='w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium mb-1 text-stone-700'>Confirmar senha</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className='w-full p-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />

                    {!isPasswordMatch && (
                        <p className='text-red-600 text-sm mt-1'>As senhas nao correspondem</p>
                    )}
                </fieldset>

                <button
                    type='submit'
                    disabled={isSaving}
                    className={`w-full p-2 rounded text-slate-950 font-semibold mt-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400 cursor-pointer'
                        } transition-colors`}
                >
                    {isSaving ? "Salvando..." : "Criar funcionario"}
                </button>
            </form>
        </div>
    )
}

export default RegisterUser
